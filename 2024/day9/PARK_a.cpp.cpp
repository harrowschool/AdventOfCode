#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std;     
void solve() {
  string s; 
  cin >> s; 
  vector<int> real; 
  for (int i=0; i<ssize(s); i++) {
    if (i % 2 == 0) {
      int add = i/2; 
      for (int j=0; j<(int)(s[i]-'0'); j++) {
        real.push_back(add); 
      }
    } else {
      for (int j=0; j<(int)(s[i]-'0'); j++) {
        real.push_back(-1); 
      }
    }
  }
  int l = 0, r = ssize(real) - 1; 
  while (1) {
    while (l < ssize(real) && real[l] != -1) ++l; 
    while (r >= 0 && real[r] == -1) --r; 
    if (l < r && real[l] == -1 && real[r] != -1) {
      swap(real[l], real[r]); 
      ++l, --r; 
    } else {
      break; 
    }
  }
  int ans = 0; 
  for (int i=0; i<ssize(real); i++) {
    if (real[i] == -1) continue; 
    ans += i * real[i]; 
  }
  cout << ans << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}