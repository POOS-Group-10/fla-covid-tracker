import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:collection';

import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:covid_mobile/services/counties/county_lines.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:provider/provider.dart';




class MapScreen extends StatefulWidget{
  const MapScreen({Key key}) : super(key: key);

  @override 
  _MapScreen createState() => _MapScreen(); 

}

class _MapScreen extends State<MapScreen> {
  Completer<GoogleMapController> _controller = Completer();
  SearchViewModel model = serviceLocator<SearchViewModel>();
  Set<Polygon> _polygons = HashSet<Polygon>();
  Set<Polygon> _tempPolygons = HashSet<Polygon>();
  List<List<LatLng>> polygonLatLngs = List<List<LatLng>>();
  String filter;
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
    "Monroe County",
    "Nassau County"
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

  CountyLines lines = new CountyLines();
  static final CameraPosition _florida = CameraPosition(
    target: LatLng(28, -84.3),
    zoom: 6,
  );

  @override
  void initState() {
    model.loadData();
    super.initState();
  }


  void _setPolygon() {
    for(int i = 0; i < lines.countyCoord.length; i++) {
      polygonLatLngs.add(new List<LatLng>());
      for (int j = 0; j < lines.countyCoord[i].length; j++) {
        polygonLatLngs[i].add(
            LatLng(lines.countyCoord[i][j][1], lines.countyCoord[i][j][0]));
      }
      final String polygonIdVal = 'polygon_id_$_polygonIdCounter';
      _polygons.add(Polygon(
        polygonId: PolygonId(polygonIdVal),
        consumeTapEvents: true,
        points: polygonLatLngs[i],
        strokeWidth: 1,
        strokeColor: Colors.red,
        fillColor: Colors.red.withOpacity(0.08),
        onTap: (){print(countyNames[i]);},
      ));
      print(_polygonIdCounter);
      _polygonIdCounter++;
    }
    lines = null;
    polygonLatLngs = null;
  }

  void _showCard(){

  }

  /*void _setPolygonsVisible(){
    _polygons = new HashSet.of(_tempPolygons);
    _tempPolygons.clear();
    _tempPolygons = null;
    print("visible");
  }*/

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
      polygons: _polygons,
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
      //bottomSheet: buildListView(model),
    );
  }

  /*Widget buildListView(SearchViewModel viewModel) {
    return ChangeNotifierProvider<SearchViewModel>(
        create: (context) => viewModel,
        child: Consumer<SearchViewModel>(
        builder: (context, model, child) => ListView.builder(
        itemCount: model.choices.length,
        itemBuilder: (context, index) {
          return cardView(index);
        })));
  }*/

 /* Widget cardView(int index) {
    return Card(
          elevation: 1.0,
          child: Padding(
              padding: EdgeInsets.fromLTRB(4.0, 1.0, 0, 1.0),
              child: ListTile(
                title: Text('${model.choices[index].name}',
                    style:
                    TextStyle(fontSize: 25, fontWeight: FontWeight.w400)),
                subtitle: Text('${model.choices[index].infected}',
                    style: TextStyle(fontSize: 15)),
                trailing: new IconButton(
                    icon: (model.choices[index].isFavorite)
                        ? Icon(Icons.favorite, color: Colors.red)
                        : Icon(Icons.favorite_border, color: Colors.red),
                    onPressed: () {
                      model.toggleFavoriteStatus(index);
                    }),
                onTap: () {
                  Navigator.pushNamed(context, '/county_screen', arguments: {
                    'countyName': model.choices[index].name,
                    'infected': model.choices[index].infected,
                  });
                },
              )),
        );
  }*/
  
}