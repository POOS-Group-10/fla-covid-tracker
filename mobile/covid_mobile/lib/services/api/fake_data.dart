import 'dart:convert';

import 'package:covid_mobile/business_logic/models/county.dart';
import 'package:covid_mobile/services/api/web_api.dart';
import 'package:http/http.dart' as http;


class WebData implements WebAPI{
  List<County> allCounty = [];
  String lastUpdated = "";

  List<County> getCountyData() {
      return allCounty; 
  }

  @override 
  Future<List<County>> fetchCountyData() async {
    
    String url = 'https://covid19-us-api.herokuapp.com/county';

    print("url: $url");

    var floridaCounties = 
    ["Alachua",
    "Baker",
    "Bay",
    "Bradford",
    "Brevard",
    "Broward",
    "Calhoun",
    "Charlotte",
    "Citrus",
    "Clay",
    "Collier",
    "Columbia",
    "DeSoto",
    "Dixie",
    "Duval",
    "Escambia",
    "Flagler",
    "Franklin",
    "Gadsden",
    "Gilchrist",
    "Glades",
    "Gulf",
    "Hamilton",
    "Hardee",
    "Hendry",
    "Hernando",
    "Highlands",
    "Hillsborough",
    "Holmes",
    "Indian River",
    "Jackson",
    "Jefferson",
    "Lafayette",
    "Lake",
    "Lee",
    "Leon",
    "Levy",
    "Liberty",
    "Madison",
    "Manatee",
    "Marion",
    "Martin",
    "Miami-Dade",
    "Monroe",
    "Nassau",
    "Okaloosa",
    "Okeechobee",
    "Orange",
    "Osceola",
    "Palm Beach",
    "Pasco",
    "Pinellas",
    "Polk",
    "Putnam",
    "Santa Rosa",
    "Sarasota",
    "Seminole",
    "St. Johns",
    "St. Lucie",
    "Sumter",
    "Suwannee",
    "Taylor",
    "Union",
    "Volusia",
    "Wakulla",
    "Walton",
    "Washington"];
  
  if (allCounty.length == 0){
    for (var temp in floridaCounties){
      var body = jsonEncode({"state": "FL", "county": temp});
      var headers = {'Content-Type': 'application/json'};
      var res = await http.post(url, body: body, headers: headers);
 
      if(res.statusCode == 200){
        var json = jsonDecode(res.body);
        var temp = json['message'][0];
        var s = County.fromJson(temp);
        print(s.countyName);
        allCounty.add(s);
      }
    }
  }else{
    print("getting from cache");
  }

    return allCounty; 
  }

}