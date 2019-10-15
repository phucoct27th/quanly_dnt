import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'qlsv.db', createFromLocation : 1});
 
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      msv:'',
      tensv:'',
      ngaysinh:'',
      lop:'',
      khoa:'',
      nganh:'',
    };
  }
  searchUser = () => {
    const {input_user_id} =this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where id = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).tensv);
            this.setState({
             msv:results.rows.item(0).msv,
            });
            this.setState({
              tensv:results.rows.item(0).tensv,
             });
             this.setState({
              ngaysinh:results.rows.item(0).ngaysinh,
             });
             this.setState({
              lop:results.rows.item(0).lop,
             });
             this.setState({
              khoa:results.rows.item(0).khoa,
             });
             this.setState({
              nganh:results.rows.item(0).nganh,
             });
          }else{
            alert('No user found');
            this.setState({
              msv:'',
              tensv:'',
              ngaysinh:'',
              lop:'',
              khoa:'',
              nganh:'',
            });
          }
        }
      );
    });
  };
  updateUser = () => {
    var that=this;
    const { input_user_id } = this.state;
    const { msv } = this.state;
    const { tensv } = this.state;
    const { ngaysinh } = this.state;
    const {lop}=this.state;
    const{khoa}=this.state;
    const{nganh}=this.state;
    if(msv){
      if(tensv){
      if(ngaysinh){
      if (lop) {
        if (khoa) {
          if (nganh) {
            db.transaction(function(tx) {
              tx.executeSql(
                'UPDATE table_user set msv=?,tensv=?,ngaysinh=?,lop=?,khoa=?,nganh=? where id=?',
                [msv,tensv,ngaysinh,lop,khoa,nganh,input_user_id],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Update Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            that.props.navigation.navigate('HomeScreen'),
                        },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    alert('Update Failed');
                  }
                }
              );
            });
          } else {
            alert('Please fill Ngành');
          }
        } else {
          alert('Please fill Khoa');
        }
      } else {
        alert('Please fill Lớp');
      }
    }else{
      alert('Please fill Ngày Sinh');
    }
  }else{
    alert('Please fill Tên Sinh Viên');
  }
      }else{
            alert('Please fill Mã Sinh Viên');
          }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Nhập ID"
              style={{ padding:10 }}
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Search"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Mã Sinh Viên"
              value={this.state.msv}
              style={{ padding:10 }}
              onChangeText={msv => this.setState({ msv })}
            />
             <Mytextinput
              placeholder="Tên Sinh Viên"
              value={this.state.tensv}
              style={{ padding:10 }}
              onChangeText={tensv => this.setState({tensv })}
            />
             <Mytextinput
              placeholder="Ngày Sinh"
              value={this.state.ngaysinh}
              style={{ padding:10 }}
              onChangeText={ngaysinh => this.setState({ngaysinh })}
            />
             <Mytextinput
              placeholder="Lớp"
              value={this.state.lop}
              style={{ padding:10 }}
              onChangeText={lop => this.setState({lop })}
            />
             <Mytextinput
              placeholder="Khoa"
              value={this.state.khoa}
              style={{ padding:10 }}
              onChangeText={khoa => this.setState({khoa })}
            />
            <Mytextinput
              value={this.state.nganh}
              placeholder="Ngành"
              onChangeText={nganh => this.setState({nganh })}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Cập Nhật"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}