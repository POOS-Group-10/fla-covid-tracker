import 'package:covid_mobile/business_logic/models/county.dart';
import 'package:covid_mobile/services/api/web_api.dart';

class FakeWebData implements WebAPI{

  @override 
  Future<List<County>> fetchCountyData() async {
    List<County> county = [];
    county.add(County(
      countyName: 'Orlando',
      infected: 20000
    ));
    county.add(County(
      countyName: 'Daytona',
      infected: 50000
    ));
    
    return county; 
  }
}