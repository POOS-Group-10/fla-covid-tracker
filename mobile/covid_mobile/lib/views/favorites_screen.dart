import 'package:covid_mobile/business_logic/view_models/favorites.dart';
import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class FavoritesScreen extends StatefulWidget {
  const FavoritesScreen({Key key}) : super(key: key);

  @override
  _FavoritesScreen createState() => _FavoritesScreen();
}

class _FavoritesScreen extends State<FavoritesScreen> {
  FavoritesViewModel model = serviceLocator<FavoritesViewModel>();

  @override
  void initState() {
    model.loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Favorites"),
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
        ),
        body: buildListView(model));
  }

  Widget buildListView(FavoritesViewModel viewModel) {
    return ChangeNotifierProvider<FavoritesViewModel>(
        create: (context) => viewModel,
        child: Consumer<FavoritesViewModel>(
            builder: (context, model, child) => ListView.builder(
                itemCount: model.favorites.length,
                itemBuilder: (context, index) {
                  return viewContainer(index);
      })));
  }

  Widget viewContainer(int index) {
    return Container(
        padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
        height: 115.0,
        width: double.maxFinite,
        child: Card(
          elevation: 2.0,
          child: Padding(
              padding: EdgeInsets.fromLTRB(4.0, 1.0, 0, 1.0),
              child: ListTile(
                title: Text('${model.favorites[index].name}',
                    style:
                        TextStyle(fontSize: 25, fontWeight: FontWeight.w400)),
                subtitle: Text('${model.favorites[index].infected}',
                    style: TextStyle(fontSize: 15)),
                onTap: () {
                  Navigator.pushNamed(context, '/county_screen', arguments: {
                    'countyName': model.favorites[index].name,
                    'infected': model.favorites[index].infected,
                  });
                },
              )),
        ));
  }
}
