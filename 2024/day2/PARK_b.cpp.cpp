#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
bool good(vector<int>& x) {
  for (int ii=0; ii<ssize(x); ii++) {
    vector<int> u; 
    for (int j=0; j<ii; j++) u.push_back(x[j]); 
    for (int j=ii+1; j<ssize(x); j++) u.push_back(x[j]); 
    bool work = 1; 
    auto v = u, v2 = u;  
    sort(v.begin(), v.end()); 
    sort(v2.rbegin(), v2.rend()); 
    if (u == v || u == v2) {
      for (int i=0; i+1<ssize(v); i++) {
        int dif = abs(u[i+1] - u[i]); 
        if (dif < 1 || dif > 3) {
          work = 0; 
        }
      }
    } else {
      work = 0; 
    }
    if (work) return true; 
  }
  return false; 
}
void solve() {
  vector<vector<int>> info; 
  string line; 
  while (getline(cin, line)) {
    stringstream ss; 
    ss << line; 
    vector<int> a; 
    int tmp; 
    while (ss >> tmp) {
      a.push_back(tmp); 
    }
    info.push_back(a); 
  }
  int ans = 0; 
  for (auto& u : info) {
    if (good(u)) {
      ++ans; 
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