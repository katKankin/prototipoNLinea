// ----------------------------------------
// BoardService
// ----------------------------------------

Othello.factory('BoardService',
  ['_', 'DiskService',
  function(_, DiskService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var WIDTH = 8;
    var HEIGHT = 8;

    var DIRECTIONS = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 }
    ];


    var _startPositions = {
      "3": {
        "3": DiskService.WHITE,
        "4": DiskService.BLACK
      },
      "4": {
        "3": DiskService.BLACK,
        "4": DiskService.WHITE
      }
    };


    var _outsideBounds = function(x, y) {
      return  x < 0 ||
              y < 0 ||
              x >= WIDTH ||
              y >= HEIGHT
      ;
    };


    var _createDisk = function(x, y) {
      var color;
      if (_startPositions[y] && _startPositions[y][x]) {
        color = _startPositions[y][x];
      }
      return DiskService.create(x, y, color);
    };


    var _createGrid = function() {
      var grid = [];
      for (var x = 0; x < WIDTH; x++) {
        var row = [];
        for (var y = 0; y < HEIGHT; y++) {
          var disk = _createDisk(x, y);
          row.push(disk);
        }
        grid.push(row);
      }
      return grid;
    };


    var _possibleMovesFor = function(board) {
      return function(color) {
        var moves = [];
        _.each(board.grid, function(col, x) {
          _.each(col, function(disk, y) {
            if (!board.grid[x][y].color) {
              var disks = board.getFlippableDisksFor(color, x, y);
              if (disks.length) {
                moves.push({ x: x, y: y });
              }
            }
          });
        });
        return moves;
      };  
    };


    var _getFlippableDisksFor = function(board) {
      return function(color, x, y) {
        var origin = { x: x, y: y };
        var x = origin.x;
        var y = origin.y;
        var total = [];

        for (var i = 0; i < DIRECTIONS.length; i++) {
          var direction = DIRECTIONS[i];
          var disks = [];
          do {
            x += direction.x;
            y += direction.y;
            if (_outsideBounds(x, y)) {
              break;
            }
            var disk = board.grid[x][y];
            if (disk.color !== color) {
              disks.push(disk);
            } else {
              total = total.concat(disks);
              break;
            }
          } while (disk.color);
          x = origin.x;
          y = origin.y;
        }
        return total;
      };
    };


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var BoardService = {};


    BoardService.create = function() {
      var board = {
        grid: _createGrid(),
        width: WIDTH,
        height: HEIGHT
      };
      board.getFlippableDisksFor = _getFlippableDisksFor(board);
      board.possibleMovesFor = _possibleMovesFor(board);
      return board;
    };


    return BoardService;

  }]);




