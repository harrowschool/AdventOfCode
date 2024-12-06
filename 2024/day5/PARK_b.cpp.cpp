#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
set<int> before[101], after[101]; 
bool vis[200]; 
void dfs(int node, vector<int>& top_sort, set<int>& vset) {
  vis[node] = true; 
  for (int i : after[node]) {
    if (vset.count(i) && !vis[i]) {
      dfs(i, top_sort, vset); 
    }
  }
  top_sort.push_back(node); 
}
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
      if (!good) {
        // let's fix it 
        for (int i=0; i<200; i++) vis[i] = false; 
        set<int> vset(v.begin(), v.end());
        vector<int> top_sort;  
        for (int i : vset) {
          if (!vis[i])
            dfs(i, top_sort, vset); 
        }
        reverse(top_sort.begin(), top_sort.end()); 
        for (int i : top_sort) cout << i << ' '; 
        cout << '\n'; 
        ans += top_sort[ssize(top_sort)/2]; 
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