#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
bool add = 1; 
bool Valid(string& s) {
  if (count(s.begin(), s.end(), ',') != 1) {
    return false; 
  }
  for (char c : s) {
    if (!isdigit(c) and c != ',') {
      return false; 
    }
  }
  return true; 
}
int Work(string& s) {
  int ans = 0; 
  int n = ssize(s); 
  for (int i=0; i<n; i++) {
    if (i+3 < n && s.substr(i, 4) == "do()") {
      add = 1; 
    }
    if (i+6 < n && s.substr(i, 7) == "don\'t()") {
      add = 0; 
    }
    if (add && i+3 < n && s.substr(i, 4) == "mul(") {
      // check if the rest makes sense 
      int idx = i+4; 
      while (idx < n && s[idx] != ')') ++idx; 
      if (idx < n) {
        string inside = s.substr(i+4, idx - (i+4)); 
        if (Valid(inside)) {
          int com = 0; 
          while (com < ssize(inside) && inside[com] != ',') {
            ++com; 
          }
          ans += stoll(inside.substr(0, com)) * stoll(inside.substr(com+1, ssize(inside) - com - 1)); 
        }
      }
    }
  }
  return ans; 
}
void solve() {
  string line; 
  int ans = 0; 
  while (getline(cin, line)) {
    ans += Work(line); 
  }
  cout << ans << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}