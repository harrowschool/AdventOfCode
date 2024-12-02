#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
void solve() {
  int a, b; 
  vector<int> A; 
  map<int,int> cnt; 
  while (cin >> a >> b) {
    A.push_back(a); 
    ++cnt[b]; 
  }
  int ans = 0; 
  for (int i=0; i<ssize(A); i++) {
    ans += A[i] * cnt[A[i]]; 
  }
  cout << ans << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}