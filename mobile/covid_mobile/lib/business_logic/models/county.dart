/*
  This class will model stored county information. 

  TODO: Research what fields we want to insert here.  
*/

class County {
  final String countyName; 
  final int infected;

  County({this.countyName, this.infected}); 

  Map<String, dynamic> toJson() => 
  {
    'countyName': countyName, 
    'infected': infected
  };

  factory County.fromJson(Map<String, dynamic> json) {
    return County(
    countyName: json['countyName'], 
    infected: json['infected']
    );
  }
  
}