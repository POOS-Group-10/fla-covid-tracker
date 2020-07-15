import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:covid_mobile/views/county_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

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
      body: Container(
        child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        headingContainer(),
        buildListView(model),
      ],
    )));
  }

  Widget headingContainer() {
    DateTime now = DateTime.now();
    String formatter = DateFormat('MMMMd').format(now);

    return Container(
      padding: EdgeInsets.fromLTRB(15.0, 24.0, 10.0, 0),
      child: SafeArea(
        child: Row(children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                child: Text("Search",
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 30,
                        fontWeight: FontWeight.bold)),
              ),
              Container(
                child: Text(formatter,
                    style: TextStyle(
                        color: Colors.grey[500],
                        fontSize: 20,
                        fontWeight: FontWeight.bold)),
              )
            ],
          ),          
          Spacer(),
          Column(
            children: [
            Container(
              // color: Colors.black,
              padding: const EdgeInsets.fromLTRB(0, 39.0, 15.0, 0.0),
                child: Row(children: [
                  Container(
                    padding: EdgeInsets.only(top: 5.0),
                  child:
                  Text("Orange",
                    style: TextStyle(
                        color: Colors.blue[400],
                        fontSize: 19,
                        fontWeight: FontWeight.w700)
                      )), 
                    Container(padding: EdgeInsets.only(left: 7.0)),
                    Icon(
                      Icons.location_on,
                      color: Colors.blue[400],
                      size: 25,
                    )
                ])
              )
          ])
        ]),
      ),
    );
  }

  Widget buildListView(SearchViewModel viewModel) {
    return ChangeNotifierProvider.value(
        value: viewModel,
        // create: (context) => viewModel,
        child: new Column(children: <Widget>[
          buildTextField(model),
          Consumer<SearchViewModel>(
              builder: (context, model, child) => ListView.builder(
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemCount: model.choices.length,
                  itemBuilder: (context, index) {
                    return filter == null || filter == ""
                        ? cardView(index)
                        : model.choices[index].name
                                .toLowerCase()
                                .contains(filter.toLowerCase())
                            ? cardView(index)
                            : new Container();
                  })
            )
        ])
      );
  }

  Widget buildTextField(SearchViewModel viewModel) {
    return Padding(
        padding: const EdgeInsets.fromLTRB(15.0, 20.0, 10.0, 0.0),
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
                  prefixIcon: Icon(Icons.search, color: Colors.grey[500], size: 20.0),
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
          elevation: 3.0,
          child: Padding(
              padding: EdgeInsets.fromLTRB(4.0, 1.0, 0, 1.0),
              child: buildTile(index)),
        ));
  }

  Widget buildTile(int index) {
    return ListTile(
      title: Text('${model.choices[index].name}',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.w400)),
      subtitle: Text('${model.choices[index].infected}',
          style: TextStyle(fontSize: 15)),
      trailing: new IconButton(
          icon: (model.choices[index].isFavorite)
              ? Icon(Icons.favorite, color: Colors.blue[300])
              : Icon(Icons.favorite_border, color: Colors.blue[300]),
          onPressed: () {
            model.toggleFavoriteStatus(index);
          }),
      onTap: () {
        Navigator.pushNamed(context, '/county_screen', arguments: {
          'countyName': model.choices[index].name,
          'infected': model.choices[index].infected,
        });
      },
    );
  }
}