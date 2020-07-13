import 'package:flutter/material.dart';
import 'package:covid_mobile/views/search_screen.dart';
import 'package:covid_mobile/views/map_screen.dart';
import 'package:covid_mobile/views/favorites_screen.dart';


class HomeScreen extends StatefulWidget{
  @override 
  _HomeScreen createState() => _HomeScreen(); 

}

class _HomeScreen extends State<HomeScreen> {
  final List<Widget> _pages = [
    new MapScreen(key: PageStorageKey('MapPage')), 
    new SearchScreen(key: PageStorageKey('SearchPage')), 
    new FavoritesScreen(key: PageStorageKey('FavoritesPage'))];

  final PageStorageBucket bucket = PageStorageBucket(); 
    
  int _currentIndex = 0; 

  @override 
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageStorage(
        child: _pages[_currentIndex],
        bucket: bucket,
      ),
      bottomNavigationBar: buildBottomNavigationBar(_currentIndex)
    );
  }

  void onItemTapped(int index){
    setState(() {
      _currentIndex = index; 
    });
  }

  Widget buildBottomNavigationBar(int _currentIndex){
    return BottomNavigationBar(
        items: const<BottomNavigationBarItem> [
          BottomNavigationBarItem(
            icon: Icon(Icons.map),
            title: Text('Map')
          ), 
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            title: Text('Search')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite_border),
            title: Text('Favorites')
          ), 
        ], 
        currentIndex: _currentIndex,
        selectedItemColor: Color.fromRGBO(127, 127, 213, 1),
        onTap: onItemTapped,
      );
  }
  
}