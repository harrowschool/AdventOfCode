#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
vector<string> grid; 
int dy[4] = {-1, 0, 1, 0}; 
int dx[4] = {0, 1, 0, -1}; 
bool Valid(int ny, int nx) {
  return ny >= 0 && ny < ssize(grid) && nx >= 0 && nx < ssize(grid[0]); 
}
int Count(int y, int x, int pos) {
  if (pos == 9) {
    return 1LL; 
  }
  int ans = 0; 
  for (int k=0; k<4; k++) {
    int ny = y + dy[k], nx = x + dx[k]; 
    if (Valid(ny, nx) && grid[ny][nx] == (char)(pos + '0' + 1)) {
      ans += Count(ny, nx, pos+1); 
    }
  }
  return ans; 
}
void solve() {
  string line; 
  while (getline(cin, line)) {
    grid.push_back(line); 
  }
  int ans = 0; 
  for (int i=0; i<ssize(grid); i++) {
    for (int j=0; j<ssize(grid[0]); j++) {
      if (grid[i][j] == '0') {
        ans += Count(i, j, 0);  
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