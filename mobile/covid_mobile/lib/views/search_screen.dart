import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';
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
        print("filter search: $filter");
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
          centerTitle: true,
          title: Text("Search"),
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
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Expanded(child: buildListView(model)),
          ],
        ));
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
                  }))
        ]));
  }

  Widget buildTextField(SearchViewModel viewModel) {
    return Padding(
        padding: const EdgeInsets.fromLTRB(20.0, 20.0, 20.0, 10.0),
        child: Container(
            decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.all(Radius.circular(10.0))),
            child: TextField(
              style: TextStyle(fontSize: 20.0),
              controller: _controller,
              decoration: InputDecoration(
                  labelStyle: TextStyle(fontSize: 20.0),
                  hintStyle: TextStyle(fontSize: 20.0),
                  hintText: 'Search',
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.all(10.0)),
              // onChanged: (text) {
              //   // viewModel.searchList(text);
              // }
            )));
  }

  Widget cardView(int index) {
    return Container(
        padding: EdgeInsets.fromLTRB(10, 10, 10, 0),
        height: 115.0,
        width: double.maxFinite,
        child: Card(
          elevation: 2.0,
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
        ));
  }
}
