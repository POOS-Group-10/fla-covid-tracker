import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:covid_mobile/views/county_screen.dart';
import 'package:covid_mobile/views/favorites_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key key}) : super(key: key);

  @override
  _SearchScreen createState() => _SearchScreen();
}

class _SearchScreen extends State<SearchScreen> {
  SearchViewModel model = serviceLocator<SearchViewModel>();
  TextEditingController _controller = TextEditingController();
  String filter;

  @override
  void initState() {
    model.loadData();

    _controller.addListener(() {
      setState(() {
        filter = _controller.text;
      });
    });

    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: false,
          title: Text("Search",
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
        body: Column(
          children: [
            buildTextField(model),
            buildListView(model)
          ]
        )
    );
  }

  Widget buildListView(SearchViewModel viewModel) {
    return ChangeNotifierProvider.value(
        value: viewModel,
          child: Expanded(child: Consumer<SearchViewModel>(
              builder: (context, model, child) => ListView.builder(
              physics: const AlwaysScrollableScrollPhysics(), // new
                  shrinkWrap: true,
                  itemCount: model.choices.length,
                  itemBuilder: (context, index) {
                    return filter == null || filter == ""
                        ? cardView(index)
                        : model.choices[index].countyName
                                .toLowerCase()
                                .contains(filter.toLowerCase())
                            ? cardView(index)
                            : new Container();
                  }))
        ));
  }

  Widget buildTextField(SearchViewModel viewModel) {
    return Padding(
        padding: const EdgeInsets.fromLTRB(15.0, 20.0, 10.0, 20.0),
        child: Container(
            decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.all(Radius.circular(10.0))),
            child: TextField(
              cursorColor: Colors.grey[400],
              style: TextStyle(fontSize: 18.0),
              controller: _controller,
              decoration: InputDecoration(
                  hintStyle: TextStyle(fontSize: 17.0),
                  prefixIcon:
                      Icon(Icons.search, color: Colors.grey[500], size: 20.0),
                  hintText: 'Search County',
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.only(top: 13.0)),
            )));
  }

  Widget cardView(int index) {
    return Container(
        padding: const EdgeInsets.fromLTRB(8, 0, 8, 0),
        height: 115.0,
        width: MediaQuery.of(context).size.width,
        child: Card(
          elevation: 4.0,
          child: buildTile(index)),
        );
  }

  Widget buildTile(int index) {
    return ListTile(
      contentPadding: EdgeInsets.fromLTRB(20, 20, 15, 0),
      title: Text('${model.choices[index].countyName}',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.w400)),
      subtitle: Text('Confirmed cases: ${model.choices[index].confirmed}',
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
          'countyName': model.choices[index].countyName,
          'stateName': model.choices[index].stateName,
          'confirmed': model.choices[index].confirmed, 
          'newCases': model.choices[index].newCases, 
          'death': model.choices[index].death, 
          'newDeath': model.choices[index].newDeath, 
          'fatalityRate': model.choices[index].fatalityRate, 
          'latitude': model.choices[index].latitude, 
          'longitude': model.choices[index].longitude
        });
      },
    );
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
