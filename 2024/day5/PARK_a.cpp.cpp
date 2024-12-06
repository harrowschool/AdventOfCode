#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
set<int> before[101], after[101]; 
void solve() {
  int ans = 0; 
  string line; 
  while (getline(cin, line)) {
    if (count(line.begin(), line.end(), '|')) {
      int a = stoll(line.substr(0, 2)), b = stoll(line.substr(3, 2)); 
      before[b].insert(a); 
      after[a].insert(b); 
    } else if (count(line.begin(), line.end(), ',')) {
      stringstream ss; 
      ss << line; 
      string substr; 
      vector<int> v; 
      while (getline(ss, substr, ',')) {
        v.push_back(stoll(substr)); 
      }
      bool good = 1; 
      for (int i=0; i<ssize(v); i++) {
        for (int j=0; j<ssize(v); j++) {
          if (j < i) {
            if (after[v[i]].count(v[j])) good = 0; 
          } 
          if (j > i) {
            if (before[v[i]].count(v[j])) good = 0; 
          }
        }
      }
      if (good) {
        for (int i : v) cout << i << ' '; 
        cout << '\n'; 
        ans += v[ssize(v)/2]; 
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