import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'qlsv.db', createFromLocation : 1});
 
export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msv:'',
      tensv:'',
      ngaysinh:'',
      lop:'',
      khoa:'',
      nganh:'',
    };
  }
 
  register_user = () => {
    var that = this;
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
              'INSERT INTO table_user (msv,tensv,ngaysinh,lop,khoa,nganh) VALUES (?,?,?,?,?,?)',
              [msv,tensv,ngaysinh,lop,khoa,nganh],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
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
                  alert('Registration Failed');
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
              placeholder="Mã Sinh Viên"
              onChangeText={msv => this.setState({msv})}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Tên Sinh Viên"
              onChangeText={tensv => this.setState({tensv })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Ngày Sinh"
              onChangeText={ngaysinh => this.setState({ngaysinh })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Lớp"
              onChangeText={lop => this.setState({lop })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Khoa"
              onChangeText={khoa => this.setState({khoa })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Ngành"
              onChangeText={nganh => this.setState({nganh})}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <Mybutton
              title="Đăng Ký"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}