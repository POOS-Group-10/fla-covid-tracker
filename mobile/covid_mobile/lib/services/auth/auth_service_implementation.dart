import 'package:covid_mobile/services/auth/auth.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:requests/requests.dart';

class AuthServiceImplementation implements AuthService{

  //https://florida-covid-tracking.herokuapp.com/api/login
  //https://florida-covid-tracking.herokuapp.com/api/Signup



  @override
  Future<String> signIn(String username, String password) async{
    var loginUrl = 'https://florida-covid-tracking.herokuapp.com/api/login';

    var res = await http.post(loginUrl, body: {'userName': username, 'password': password});


    if (res.statusCode == 200){
      dynamic json = res.body.toString(); 

      String prefsKey = 'userName';

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString(prefsKey, username);
    
      return json;
    }else{
      return null; 
    }
  }

  @override
  Future<String> register(String username, String password, String fname, String lname, String email, String county) async {
    String registerUrl = "https://florida-covid-tracking.herokuapp.com/api/Signup";
    
    var res = await http.post(registerUrl, body: {
      'userName': username, 
      'firstName': fname, 
      'lastName': lname, 
      'email': email, 
      'userCounty': county,
      'password': password,
      });

    if (res.statusCode == 200){
      var json = res.body.toString();
      return json; 
    }else{
      return null; 
    }
  }

  @override
  Future<String> forgotPassword(String email) async {
    String passwordUrl = "https://florida-covid-tracking.herokuapp.com/api/PasswordRecovery";

     var res = await http.post(passwordUrl, body: {
      'email': email, 
      });
    
    if (res.statusCode == 200){
      var json = res.body.toString();
      return json; 
    }else{
      return null; 
    }
  }

  // @override
  // Future<Map<String,String>> getCookies() async {
  //   String hostname = Requests.getHostname(loginUrl);
  //   var cookies = await Requests.getStoredCookies(hostname);
  //   return cookies;
  // }

  // @override
  // String readCookies() {
  //   var cookies = getCookies(); 
  //   var s; 

  //   cookies.then((value) =>  s = value[1]);

  //   return "s";
  //   // print(_list.runtimeType);
  //   // String user = _list[1];
  //   // print("user: $user");
  // }
}

