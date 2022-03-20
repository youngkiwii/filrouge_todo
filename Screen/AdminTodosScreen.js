import React, { useEffect, useState, useContext } from 'react'
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import TaskCard from '../components/TaskCard'

import { tasks, deleteTaskById } from '../API/todoAPI'
import { CustomButton } from '../components/UI/CustomButton'
import DropDownPicker from 'react-native-dropdown-picker'
import { ContainerWhite } from '../components/Container'

const ALL_TASKS = "all_tasks";
const FINISHED_TASKS = "finished_tasks";
const NON_FINISHED_TASKS = "non_finished_tasks";

export default function AdminTodosScreen ({ route, navigation }) {
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [original, setOriginal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [feedback, setFeedback] = useState(null);

    // DropDown Picker
    DropDownPicker.setTheme("LIGHT");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Toutes les tâches', value: ALL_TASKS},
        {label: 'Tâches réalisés', value: FINISHED_TASKS},
        {label: 'Tâches non réalisées', value: NON_FINISHED_TASKS}
    ]);

    const changeCount = (value) => {
        setCount(count + value);
    }

    // Tri des tâches
    const selectSorting = (type) => {
        switch(type) {
            case ALL_TASKS:
                setData(original);
                break;
            case FINISHED_TASKS:
                setData(original.filter(item => item.done));
                break;
            case NON_FINISHED_TASKS:
                setData(original.filter(item => !item.done));
                break;
            default:
                console.log("erreur");
        }
    }

    const deleteTask = (item) => {
        deleteTaskById(item.id, token)
        .then(json => {
            const newResult = original.filter(value => (value.id != item.id));
            setOriginal(newResult);
            setData(newResult);
        })
        .catch(err => {
            setFeedback(err.message);
        });
    };

    // change le compte à chaque changement de la variable data et charge toutes les tâches quand data est vide
    useEffect(() => {
        if (original.length === 0) {
            tasks(route.params.username, route.params.id, token)
            .then(taskLists => {
                const result = taskLists.filter(item => item.belongsTo != null);
                setData(result);
                setOriginal(result);
                setLoading(false);
            })
            .catch(err => {
                setFeedback(err.message);
            })
        }
        setCount(original.filter(item => item.done).length);
    }, [data]);

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <ContainerWhite>
                            {
                                feedback ?
                                <Text style={{ position: 'absolute', marginTop: 10, color: 'red'}}>{feedback}</Text>
                                :
                                <></>
                            }
                            <View style={{ width: "70%"}}>
                                <Text style={styles.title}>Mes tâches</Text>
                                <View style={{ marginTop: 5,flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <Text style={styles.subtitle}>{ count  + ' ' + (count > 1 ? 'tâches réalisées' : 'tâche réalisée')} pour </Text>
                                    <Text style={{textDecorationLine: 'underline'}}>{route.params.todolist}</Text>
                                </View>
                            </View>
                            <View style={{zIndex: 2000}}>
                                <DropDownPicker
                                    placeholder="Trier par ..."
                                    placeholderStyle={{
                                        color: "grey",
                                        fontWeight: "bold"
                                    }}
                                    style={{ marginTop: 10,width: '70%'}}
                                    dropDownContainerStyle={{ zIndex: 3, width: '70%'}}
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    onChangeValue={(item) => {
                                        selectSorting(item);
                                    }}
                                />
                            </View>
                            <View style={style.divBtn}>
                                <CustomButton onPress={() => { checkTasks(true) }} text="Tout cocher" outline/>
                                <CustomButton onPress={() => { checkTasks(false) }} style={{marginLeft: 10}} text="Tout décocher" outline/>
                            </View>
                            {
                                loading ? 
                                <ActivityIndicator color="#999999" size="large"/>
                                :
                                <FlatList 
                                    style={{marginTop: 20, width: "70%", maxHeight: 400}}
                                    data={data}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => 
                                        <TaskCard item={item}
                                            changeCount={changeCount} 
                                            deleteTask={() => {deleteTask(item)}} 
                                            style={{marginTop: 10}}
                                            disabled
                                        />
                                    }
                                />
                            }
                        </ContainerWhite>
                    }
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}
const style = StyleSheet.create({
    divBtn: {
        flexDirection: 'row',
        marginTop: 10,
    }
});