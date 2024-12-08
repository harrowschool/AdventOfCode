#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
vector<string> grid; 
int dy[4] = {-1, 0, 1, 0}; 
int dx[4] = {0, 1, 0, -1};   
int sy = -1, sx = -1; 
bool cycle() {
  int y = sy, x = sx; 
  int dir = 0; 
  map<array<int,3>, bool> distinct; 
  while (y >= 0 && y < ssize(grid) && x >= 0 && x < ssize(grid[0])) {
    if (distinct.count(array<int,3>{y, x, dir})) {
      return true; 
    }
    distinct[array<int,3>{y, x, dir}] = true; 
    int ny = y + dy[dir], nx = x + dx[dir]; 
    while (ny >= 0 && ny < ssize(grid) && nx >= 0 && nx < ssize(grid[0]) && grid[ny][nx] == '#') {
      dir = (dir + 1) % 4; 
      ny = y + dy[dir], nx = x + dx[dir]; 
    }
    y = ny, x = nx; 
  }
  return false; 
}
void solve() {
  string line; 
  while (getline(cin, line)) {
    grid.push_back(line); 
  }
  for (int i=0; i<ssize(grid) && sy == -1 && sx == -1; i++) {
    for (int j=0; j<ssize(grid[0]) && sy == -1 && sx == -1; j++) {
      if (grid[i][j] == '^') {sy = i, sx = j;}
    }
  }
  int ans = 0; 
  for (int i=0; i<ssize(grid); i++) {
    for (int j=0; j<ssize(grid[0]); j++) {
      if (grid[i][j] != '#') {
        grid[i][j] = '#'; 
        if (cycle()) {
          ++ans; 
        }
        grid[i][j] = '.'; 
      }
    }
  }
  cout << ans << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}