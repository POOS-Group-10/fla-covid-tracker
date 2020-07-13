import 'dart:convert';

import 'package:covid_mobile/business_logic/models/county.dart';
import 'package:covid_mobile/services/storage/storage_service.dart';
import 'package:covid_mobile/views/map_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StorageSerivceImplementation implements StorageService {
  
  static const sharedPrefCountyKey = 'county_key';


  @override
  Future saveFavoriteCounties(List<County> data) async{
    // final county = data.map((county) => county.countyName).toList();
    final county = data.map((i) => i.toJson()).toList();

    String jsonString = jsonEncode(county);
    // print("saveFavoriteCounties: ${jsonString}");

    final prefs = await SharedPreferences.getInstance();
    prefs.setString(sharedPrefCountyKey, jsonString);
  }

  @override
  Future<List<County>> getFavoriteCounties() async {
    // String data = await _getStringFromPreferences(sharedPrefCountyKey);

    // if (data == '') {
    //   return [];
    // }

    final prefs = await SharedPreferences.getInstance();
    String data = prefs.getString(sharedPrefCountyKey);

    if (data == '' || data == null) {
      return [];
    }

    print("FUCKKK: $data");

    final decodedData = jsonDecode(data);

    List<County> counties = []; 
    
    for(var val in decodedData){
      counties.add(County.fromJson(val));
    }
  

    return counties; 
  }


  Future<String> _getStringFromPreferences(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return Future<String>.value(prefs.getStringList(key) ?? '');
  }
}