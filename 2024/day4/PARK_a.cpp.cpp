#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
int n, m; 
vector<string> grid; 
void solve() {
  string line; 
  while (getline(cin, line)) {
    grid.push_back(line); 
  }
  n = ssize(grid), m = ssize(grid[0]); 
  int ans = 0; 
  for (int i=0; i<n; i++) {
    for (int j=0; j<m; j++) {
      if (j + 3 < m && (grid[i].substr(j, 4) == "XMAS" || grid[i].substr(j, 4) == "SAMX")) {
        ++ans; 
      }
    }
  }
  for (int j=0; j<m; j++) {
    for (int i=0; i<n; i++) {
      if (i + 3 < n) {
        string a = ""; 
        for (int k=0; k<=3; k++) {
          a += grid[i+k][j]; 
        }
        if (a == "XMAS" || a == "SAMX") {
          ++ans; 
        }
      }
    }
  }
  for (int i=0; i<n; i++) {
    for (int j=0; j<m; j++) {
      string a = "", b = "";  
      if (i+3 < n && j+3 < m) {
        for (int k=0; k<=3; k++) {
          a += grid[i+k][j+k]; 
        }
        if (a == "XMAS" || a == "SAMX") ++ans; 
      }
      if (i+3 < n && j-3 >= 0) {
        for (int k=0; k<=3; k++) {
          b += grid[i+k][j-k]; 
        }
        if (b == "XMAS" || b == "SAMX") ++ans; 
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