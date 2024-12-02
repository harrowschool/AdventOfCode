#include <bits/stdc++.h> 
#define int long long 
#define ssize(x) (int)x.size() 
using namespace std; 
void solve() {
  int a, b; 
  vector<int> A, B; 
  while (cin >> a >> b) {
    A.push_back(a); 
    B.push_back(b); 
  }
  sort(A.begin(), A.end()); 
  sort(B.begin(), B.end()); 
  int ans = 0; 
  for (int i=0; i<ssize(A); i++) {
    ans += abs(A[i] - B[i]); 
  }
  cout << ans << '\n'; 
}
signed main() {
  freopen("input.txt", "r", stdin); 
  freopen("output.txt", "w", stdout); 
  solve(); 
  return 0; 
}