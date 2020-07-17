/*
  This class will model stored county information. 

  TODO: Research what fields we want to insert here.  
*/

class County {
  final String countyName; 
  final String stateName; 
  final int confirmed; 
  final int newCases; 
  final int death; 
  final int newDeath; 
  final String fatalityRate; 
  final double latitude; 
  final double longitude; 

  County({this.countyName, this.stateName, this.confirmed, this.newCases, this.death, this.newDeath, this.fatalityRate, this.latitude, this.longitude}); 

  Map<String, dynamic> toJson() => 
  {
    'county_name': countyName, 
    'state_name': stateName, 
    'confirmed': confirmed, 
    'new': newCases, 
    'death': death, 
    'new_death': newDeath, 
    'fatality_rate': fatalityRate, 
    'latitude': latitude, 
    'longitude': longitude
  };

  factory County.fromJson(Map<String, dynamic> json) {
    return County(
    countyName: json['county_name'],
    stateName: json['state_name'], 
    confirmed: json['confirmed'], 
    newCases: json['new'], 
    death: json['death'], 
    newDeath: json['new_death'], 
    fatalityRate: json['fatality_rate'], 
    latitude: json['latitude'], 
    longitude: json['longitude'] 
    );
  }
  
}