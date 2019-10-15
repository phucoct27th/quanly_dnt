import React from 'react';
import { View,ImageBackground,Image} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'qlsv.db', createFromLocation : 1});
 
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT,msv VARCHAR(20),tensv VARCHAR(30),ngaysinh VARCHAR(20),lop VARCHAR(20),khoa VARCHAR(30),nganh VARCHAR(30))',
              []
            );
          }
        }
      );
    });
  }
 
  render() {
    return (
      
          <View
          style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <ImageBackground source={require('../1.jpg')} style={{width: '100%', height: '100%'}}>
        <Image source={require('../2.jpg')} style={{width:250,height:250,borderRadius:120,marginLeft:50}}/>
        <Mybutton
          title="Thêm"
          customClick={() => this.props.navigation.navigate('Register')}
        />
        <Mybutton
          title="Cập Nhật"
          customClick={() => this.props.navigation.navigate('Update')}
        />
        <Mybutton
          title="Xem Chi Tiết"
          customClick={() => this.props.navigation.navigate('View')}
        />
        <Mybutton
          title="Xem Danh Sách"
          customClick={() => this.props.navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="Xóa"
          customClick={() => this.props.navigation.navigate('Delete')}
        />
        </ImageBackground>
      </View>
  
      
    );
  }
}