#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std;     
void solve() {
  string s;
  int ans = 0; 
  while (getline(cin, s)) {
    int target = stoll(s.substr(0, s.find(':'))); 
    s = s.substr(s.find(':') + 1, ssize(s) - s.find(':') - 1); 
    stringstream ss; 
    ss << s; 
    vector<int> candidate; 
    int val = -1; 
    while (ss >> val) {
      candidate.push_back(val);
    }
    bool ok = 0; 
    for (int i=0; i<(1<<(ssize(candidate) - 1)); i++) {
      int tot = candidate[0]; 
      for (int j=0; j<ssize(candidate)-1; j++) {
        if ((1<<j) & i) {
          tot += candidate[j+1]; 
        } else {
          tot *= candidate[j+1]; 
        }
      }
      if (tot == target) {
        ok = 1; 
        break; 
      }
    }
    if (ok) {
      ans += target; 
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