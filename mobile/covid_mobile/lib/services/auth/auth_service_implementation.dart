import 'package:covid_mobile/services/auth/auth.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';


class AuthServiceImplementation implements AuthService{
  @override
  //https://florida-covid-tracking.herokuapp.com/api/login
  //https://florida-covid-tracking.herokuapp.com/api/Signup

  Future<String> signIn(String email, String password) async{
    var loginUrl = 'https://florida-covid-tracking.herokuapp.com/api/login';
    print("yurrrrt: $loginUrl");
    var res = await http.post(loginUrl, body: {'userName': email, 'password': password});
      print("yurrrrt22222:");

    if (res.statusCode == 200){
      print("yoooo: ${res.body.toString()}");
      String prefKey = 'email';
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString(prefKey, email);
      print("bodyyyy: ${res.body}");
      return res.body;
    }else{
      print("NOPEEE");
      return null; 
    }
  }
}

