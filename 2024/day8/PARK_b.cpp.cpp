#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std;     
vector<string> grid; 
bool valid(int y, int x) {
  return y >= 0 && y < ssize(grid) && x >= 0 && x < ssize(grid[0]); 
}
void solve() {
  string line; 
  while (getline(cin, line)) {
    grid.push_back(line); 
  }
  map<array<int,2>,bool> distinct; 
  for (int a=0; a<ssize(grid); a++) {
    for (int b=0; b<ssize(grid[0]); b++) {
      for (int c=0; c<ssize(grid); c++) {
        for (int d=0; d<ssize(grid[0]); d++) {
          if (a != c && b != d && grid[a][b] == grid[c][d] && grid[a][b] != '.') {
            // same frequency 
            int dy = c-a, dx = d-b; 
            int ny = a, nx = b; 
            while (valid(ny, nx)) {
              distinct[array<int,2>{ny, nx}] = true; 
              ny -= dy, nx -= dx; 
            }
            ny = c, nx = d; 
            while (valid(ny, nx)) {
              distinct[array<int,2>{ny, nx}] = true;
              ny += dy, nx += dx; 
            }
          }
        }
      }
    }
  }
  cout << ssize(distinct) << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}