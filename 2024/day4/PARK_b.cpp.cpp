#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
int n, m; 
vector<string> grid; 
bool chk(vector<string>& A) {
  string a = "", b = ""; 
  for (int i=0; i<3; i++) {
    a += A[i][i]; 
    b += A[2-i][i]; 
  }
  return ((a == "MAS" or a == "SAM") and (b == "MAS" or b == "SAM")); 
}
void solve() {
  string line; 
  while (getline(cin, line)) {
    grid.push_back(line); 
  }
  n = ssize(grid), m = ssize(grid[0]); 
  int ans = 0; 
  for (int i=0; i<n; i++) {
    for (int j=0; j<m; j++) {
      if (i+2 < n && j+2 < m) {
        vector<string> A(3, ""); 
        for (int k=0; k<3; k++) {
          for (int l=0; l<3; l++) {
            A[k] += grid[i+k][j+l]; 
          }
        }
        if (chk(A)) {
          ++ans; 
        }
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