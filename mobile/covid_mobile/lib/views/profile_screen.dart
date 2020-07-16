import 'package:covid_mobile/business_logic/view_models/favorites.dart';
import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key key}) : super(key: key);

  @override
  _ProfileScreen createState() => _ProfileScreen();
}

class _ProfileScreen extends State<ProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: false,
          title: Text("Profile",
              style: TextStyle(
                color: Colors.white,
                fontSize: 25,
              )),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: <Color>[
                  Color.fromRGBO(127, 127, 213, 1),
                  Color.fromRGBO(134, 168, 231, 1)
                ])),
          ),
          actions: <Widget>[
            logout()
          ],
        ),
        body: Center(child: Text("profile")));
  }

  Widget logout() {
    return Container(
      padding: EdgeInsets.fromLTRB(0, 0, 10, 0),
        child: IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () async {
              SharedPreferences prefs = await SharedPreferences.getInstance();
              prefs.remove('userName');
              Navigator.pushReplacementNamed(context, '/login');
            }));
  }
}
