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
  for (int i=ssize(real)-1; i>=0; i--) {
    if (real[i] == -1) continue; 
    int cnt = 0, idx = i; 
    while (idx >= 0 && real[idx] == real[i]) {
      ++cnt, --idx; 
    }
    for (int j=0; j<i; j++) {
      if (real[j] == -1) {
        int cnt_empty = 0, idx_empty = j; 
        while (idx_empty < ssize(real) && real[idx_empty] == real[j]) {
          ++cnt_empty, ++idx_empty; 
        }
        if (cnt_empty >= cnt) {
          // you can move this here 
          for (int k=0; k<cnt; k++) {
            swap(real[j+k], real[i-k]); 
          }
          break; 
        }
        j = idx_empty - 1; 
      }
    }
    i = idx + 1; 
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