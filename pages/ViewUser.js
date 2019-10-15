import React from 'react';
import { Text, View, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'qlsv.db', createFromLocation : 1});
 
export default class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      userData: '',
    };
  }
  searchUser = () => {
    const { input_user_id } = this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where id = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState({
              userData: results.rows.item(0),
            });
          } else {
            alert('No user found');
            this.setState({
              userData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Nhập ID"
          onChangeText={input_user_id => this.setState({ input_user_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search"
          customClick={this.searchUser.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>Id: {this.state.userData.id}</Text>
          <Text>Mã Sinh Viên: {this.state.userData.msv}</Text>
          <Text>Tên Sinh Viên: {this.state.userData.tensv}</Text>
          <Text>Ngày Sinh: {this.state.userData.ngaysinh}</Text>
          <Text>Lớp:{this.state.userData.lop}</Text>
          <Text>Khoa:{this.state.userData.khoa}</Text>
          <Text>Ngành:{this.state.userData.nganh}</Text>
        </View>
      </View>
    );
  }
}