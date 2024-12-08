#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
vector<string> grid; 
int dy[4] = {-1, 0, 1, 0}; 
int dx[4] = {0, 1, 0, -1}; 
void solve() {
  string line; 
  while (getline(cin, line)) {
    grid.push_back(line); 
  }
  int y = -1, x = -1; 
  for (int i=0; i<ssize(grid) && y == -1 && x == -1; i++) {
    for (int j=0; j<ssize(grid[0]) && y == -1 && x == -1; j++) {
      if (grid[i][j] == '^') {y = i, x = j;}
    }
  }
  int dir = 0; 
  map<array<int,2>, bool> distinct; 
  while (y >= 0 && y < ssize(grid) && x >= 0 && x < ssize(grid[0])) {
    distinct[array<int,2>{y, x}] = true; 
    int ny = y + dy[dir], nx = x + dx[dir]; 
    while (ny >= 0 && ny < ssize(grid) && nx >= 0 && nx < ssize(grid[0]) && grid[ny][nx] == '#') {
      dir = (dir + 1) % 4; 
      ny = y + dy[dir], nx = x + dx[dir]; 
    }
    y = ny, x = nx; 
  }
  cout << ssize(distinct) << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}