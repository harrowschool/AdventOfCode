#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std;     
vector<int> candidate; 
vector<int> g; 
bool possible(int pos, int target) {
  if (pos == ssize(candidate)-1) {
    int tot = candidate[0]; 
    for (int i=0; i<ssize(g); i++) {
      if (g[i] == 0) {
        // + 
        tot += candidate[i+1]; 
      } else if (g[i] == 1) {
        // * 
        tot *= candidate[i+1]; 
      } else if (g[i] == 2) {
        // || 
        tot = stoll(to_string(tot) + to_string(candidate[i+1])); 
      }
    }
    if (tot == target) {
      return true; 
    } else {
      return false; 
    }
  }
  for (int i=0; i<3; i++) {
    g.push_back(i); 
    bool ok = possible(pos+1, target); 
    g.pop_back(); 
    if (ok) return true; 
  }
  return false; 
}
void solve() {
  string s;
  int ans = 0; 
  while (getline(cin, s)) {
    int target = stoll(s.substr(0, s.find(':'))); 
    s = s.substr(s.find(':') + 1, ssize(s) - s.find(':') - 1); 
    stringstream ss; 
    ss << s; 
    int val = -1;
    candidate.clear();  
    while (ss >> val) {
      candidate.push_back(val);
    }
    bool ok = possible(0, target); 
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