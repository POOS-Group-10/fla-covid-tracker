
abstract class AuthService {
  Future<String> signIn(String username, String password);
  Future<String> register(String username, String password, String fname, String lname, String email, String county);
  Future<String> forgotPassword(String email);
  // Future<Map<String,String>> getCookies();
  // String readCookies();
}



