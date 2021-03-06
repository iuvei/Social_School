'use strict';
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Theme from '../utils/Theme';
import API from '../utils/API_v1';
import { getGMTTimeDiff } from '../utils/Util';
import { withNavigation } from 'react-navigation';
import { IconFont, GroupAvatar, UserAvatar } from '../components/Utils';


function _GroupPostItem(props) {
  const item = props.status;
  const onPress = ()=>props.navigation.navigate('Status_StatusPage', {status: item});
  const onPress2 = ()=>props.navigation.navigate('Group_GroupPage', {group: item.group});
  const onPress3 = ()=>props.navigation.navigate('User_UserPage', {user: item.user});
  const textColor = item.replies == 0 ? '#f56262' : '#aaa';
  const iconColor = item.replies == 0 ? "#DEDEDE" :
                item.replies <= 5 ? "#FAD389" :
                item.replies <= 10 ? "#F7B26D" : "#F58A5F";
  return (
    <TouchableHighlight onPress={onPress} underlayColor={Theme.activeUnderlayColor}>
      <View style={{backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', paddingVertical: 14, paddingRight: 12}}>
          <View style={{width: 48, alignItems: 'center'}}>
            <IconFont icon='&#xe605;' size={16} color={iconColor} />
            <Text style={{fontSize: 12, color: textColor, margin: 4}}>
              { item.replies == 0 ? 'new': item.replies }
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: '#444', fontSize: 15, marginBottom: 8, numberOfLines: 2, lineHeight: 22}}>{item.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                { props.groupMode ?
                  <GroupAvatar size={16} group={item.group} borderRadius={2}/>:
                  <UserAvatar size={16} user={item.user} hideLogo borderRadius={2}/>
                }
                { props.groupMode ? 
                  <Text style={{fontSize: 12, color: '#777', marginLeft: 4, marginRight: 16}}
                        onPress={onPress2}>{item.group.groupname}</Text>:
                  <Text style={{fontSize: 12, color: '#777', marginLeft: 4, marginRight: 16}}
                        onPress={onPress3}>{item.user.username}</Text>
                }
                <Text style={{fontSize: 11, color:'#bbb'}}>{getGMTTimeDiff(item.timestamp)}</Text>
              </View>
            </View>
            {item.pics.length > 0 ? 
                <Image style={{height: 48, width: 48, borderRadius: 4, marginTop: 2, marginLeft: 8, 
                    borderWidth: .5, borderColor: "rgba(200,200,200,.5)"}} source={{uri:item.pics[0]}} />: 
                null
            }
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 48, height: .5, backgroundColor: props.groupMode ? '#ddd' : '#fff'}} />
          <View style={{flex: 1, height: .5, backgroundColor: '#ddd'}} />
        </View>
      </View>
    </TouchableHighlight>
  );
}
const GroupPostItem = withNavigation(_GroupPostItem);
export default GroupPostItem;
