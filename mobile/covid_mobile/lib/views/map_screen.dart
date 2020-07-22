import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:collection';

import 'package:flutter/cupertino.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
//import 'package:covid_mobile/services/counties/county_lines.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:provider/provider.dart';
import 'dart:math';
import 'package:flutter/services.dart' show rootBundle;

class MapScreen extends StatefulWidget{
  const MapScreen({Key key}) : super(key: key);

  @override 
  MapScreen1 createState() => MapScreen1();

}

class Counties {
  List<dynamic> countyLines;

  Counties(this.countyLines);

  Counties.fromJson(Map<String, dynamic> json)
    : countyLines = json['counties'];

}

class MapScreen1 extends State<MapScreen> {
  final double logConstant = log(1.1);
  Completer<GoogleMapController> _controller = Completer();
  SearchViewModel model = serviceLocator<SearchViewModel>();
  Set<Polygon> polygons = HashSet<Polygon>();
  Set<Polygon> _tempPolygons = HashSet<Polygon>();
  List<List<LatLng>> polygonLatLngs = List<List<LatLng>>();
  String filter;

  Future<String> loadAsset() async {
    return await rootBundle.loadString('assets/countyLines1.json');
  }

  List<String> countyNames = [
    "Alachua County",
    "Baker County",
    "Bay County",
    "Bradford County",
    "Brevard County",
    "Broward County",
    "Calhoun County",
    "Charlotte County",
    "Citrus County",
    "Clay County",
    "Collier County",
    "Columbia County",
    "DeSoto County",
    "Dixie County",
    "Duval County",
    "Escambia County",
    "Flagler County",
    "Franklin County",
    "Gadsden County",
    "Gilchrist County",
    "Glades County",
    "Gulf County",
    "Hamilton County",
    "Hardee County",
    "Hendry County",
    "Hernando County",
    "Highlands County",
    "Hillsborough County",
    "Holmes County",
    "Indian River County",
    "Jackson County",
    "Jefferson County",
    "Lafayette County",
    "Lake County",
    "Lee County",
    "Leon County",
    "Levy County",
    "Liberty County",
    "Madison County",
    "Manatee County",
    "Marion County",
    "Martin County",
    "Miami-Dade County",
    "Monroe County",
    "Nassau County",
    "Okaloosa County",
    "Okeechobee County",
    "Orange County",
    "Osceola County",
    "Palm Beach County",
    "Pasco County",
    "Pinellas County",
    "Polk County",
    "Putnam County",
    "St. Johns County",
    "St. Lucie County",
    "Santa Rosa County",
    "Sarasota County",
    "Seminole County",
    "Sumter County",
    "Suwannee County",
    "Taylor County",
    "Union County",
    "Volusia County",
    "Wakulla County",
    "Walton County",
    "Washington County",
  ];

  List<int> reorder = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
    33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,57,58,54,55,56,59,60,61,62,63,64,65,66,67];

  String styleJSON = '''[
  {
  "featureType": "administrative",
  "elementType": "geometry",
  "stylers": [
  {
  "visibility": "off"
  }
  ]
},
{
"featureType": "administrative.land_parcel",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "administrative.neighborhood",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "poi",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "poi",
"elementType": "labels.text",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "road",
"elementType": "labels",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "road",
"elementType": "labels.icon",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "road.arterial",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "road.highway",
"elementType": "labels",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "road.local",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "transit",
"stylers": [
{
"visibility": "off"
}
]
},
{
"featureType": "water",
"elementType": "labels.text",
"stylers": [
{
"visibility": "off"
}
]
}
]''';
  int _polygonIdCounter = 1;

  static final CameraPosition _florida = CameraPosition(
    target: LatLng(28, -84.3),
    zoom: 6,
  );

  @override
  initState() {
     model.loadData();
    super.initState();
  }

  Color calculateColor(int a){
    if(model.choices[reorder[a]].confirmed > 10000){
      return Color.fromARGB(128, 255, ((3.83 - log(((model.choices[reorder[a]].confirmed-9999)/2000)+1))*66.5).toInt(), 0);
    }else{
      return Color.fromARGB(128,(log(model.choices[reorder[a]].confirmed)*27.68).toInt(), 255, 0);
    }
  }

  void _setPolygon() async{
    Map<String, dynamic> countiiies = json.decode(await loadAsset());
    //var poops = new Counties.fromJson(countiiies);
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    var coooont = new Counties.fromJson(countiiies);
    String border;
    List<String> pairs;
    List<String> aupair;

    for(int i = 0; i < coooont.countyLines.length ; i++) {
      polygonLatLngs.add(new List<LatLng>());
      border = coooont.countyLines[i].toString();
      border = border.substring(2,border.length-2);
      pairs = border.split("], [");
      for (int j = 0; j < pairs.length; j++) {
        aupair = pairs[j].split(", ");
        polygonLatLngs[i].add(
            LatLng(double.parse(aupair[1]),
                double.parse(aupair[0])));
      }

      List<LatLng> passedPoints = new List<LatLng>();
      for(int f = 0; f < polygonLatLngs[i].length; f++){
        passedPoints.add(polygonLatLngs[i][f]);
      }
      Color color123 = calculateColor(i);

      final String polygonIdVal = 'polygon_id_$_polygonIdCounter';
      polygons.add(Polygon(
          polygonId: PolygonId(polygonIdVal),
          consumeTapEvents: true,
          points: polygonLatLngs[i],
          strokeWidth: 1,
          strokeColor: Colors.black,
          fillColor: calculateColor(i),
          //Colors.red.withOpacity(((log(model.choices[reorder[i]].confirmed-30))/12.001)+.001),
          onTap: () {
            showModalBottomSheet(
              context: context,
              builder: (context) {
                return Padding(
                  padding: EdgeInsets.fromLTRB(5.0, 5.0, 5.0, 70.0),
                  child: Card(
                    elevation: 0.0,
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(15.0, 15.0, 15.0, 15.0),
                        child: ListTile(
                          title: Text(countyNames[i],
                              style:
                              TextStyle(
                                  fontSize: 25, fontWeight: FontWeight.w400)),
                          subtitle: Text("Confirmed cases: " + model.choices[reorder[i]].confirmed.toString(),
                              style: TextStyle(fontSize: 15)),
                          trailing: new IconButton(
                              icon: (model.choices[reorder[i]].isFavorite)
                                  ? Icon(Icons.favorite, color: Colors.red)
                                  : Icon(
                                  Icons.favorite_border, color: Colors.red),
                              onPressed: () {
                                setState(() {
                                  model.toggleFavoriteStatus(reorder[i]);
                                  child: new IconButton(icon: (model.choices[reorder[i]].isFavorite)
                                      ? Icon(Icons.favorite, color: Colors.red)
                                      : Icon(
                                      Icons.favorite_border, color: Colors.red));
                                });
                              }),
                          onTap: () {
                            Navigator.pushNamed(context, '/county_screen', arguments: {
                              'countyName': model.choices[reorder[i]].countyName,
                              'stateName': model.choices[reorder[i]].stateName,
                              'confirmed': model.choices[reorder[i]].confirmed,
                              'newCases': model.choices[reorder[i]].newCases,
                              'death': model.choices[reorder[i]].death,
                              'newDeath': model.choices[reorder[i]].newDeath,
                              'fatalityRate': model.choices[reorder[i]].fatalityRate,
                              'latitude': model.choices[reorder[i]].latitude,
                              'longitude': model.choices[reorder[i]].longitude,
                              'index' : reorder[i],
                              'points' : passedPoints,
                              'color' : color123,
                            });
                          },
                        )),
                  ),
                );
              },
              backgroundColor: Colors.black.withOpacity(0.00),
              elevation: 0.0,
              barrierColor: Colors.black.withOpacity(0.01),
            );
          }));
      print(countyNames[i]);
      print(model.choices[i].confirmed);
      _polygonIdCounter++;
    }
    polygonLatLngs = null;
    countiiies = null;
    coooont = null;
    border = null;
    pairs = null;
    aupair = null;
  }

  void _showCard(){

  }

  /*void _setPolygonsVisible(){
    _polygons = new HashSet.of(_tempPolygons);
    _tempPolygons.clear();
    _tempPolygons = null;
    print("visible");
  }*/

  void _nothing(){

  }

  /*void _setPolygonsInvisible(){
    _tempPolygons = new HashSet.of(_polygons);
    _polygons.clear();
    _polygons = null;
    print("not visible");
  }*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text("Map"),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: <Color>[
                Color.fromRGBO(127, 127, 213, 1),
                Color.fromRGBO(134, 168, 231, 1)
              ]
            )
          ),
        ),
      ),
      body: GoogleMap(
      mapType: MapType.normal,
      initialCameraPosition: _florida,
      polygons: polygons,
      //onCameraIdle: _setPolygonsVisible,
      //onCameraMoveStarted: _setPolygonsInvisible,
      onMapCreated: (GoogleMapController controller) {
        setState(() {
          _setPolygon();
        }
        );
        controller.setMapStyle(styleJSON);
        _controller.complete(controller);
      },
    ),
    );
  }


  /*Widget cardView(int index) {
    return Card(
          elevation: 1,
          child: Padding(
              padding: EdgeInsets.fromLTRB(4.0, 1.0, 0, 1.0),
              child: ListTile(
                title: Text('${model.choices[reorder[index]].countyName}',
                    style:
                    TextStyle(fontSize: 25, fontWeight: FontWeight.w400)),
                subtitle: Text('${model.choices[reorder[index]].death}',
                    style: TextStyle(fontSize: 15)),
                trailing: new IconButton(
                    icon: (model.choices[reorder[index]].isFavorite)
                        ? Icon(Icons.favorite, color: Colors.red)
                        : Icon(Icons.favorite_border, color: Colors.red),
                    onPressed: () {
                      model.toggleFavoriteStatus(index);
                    }),
                onTap: () {
                  Navigator.pushNamed(context, '/county_screen', arguments: {
                    'countyName': model.choices[index].countyName,
                    'infected': model.choices[index].death,
                  });
                },
              )),
        );
  }*/
  
}