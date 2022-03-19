import React, { useEffect, useState, useContext } from 'react'
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import Input from '../components/UI/Input'
import TaskCard from '../components/TaskCard'

import { createTask, deleteTaskById, tasks } from '../API/todoAPI'
import { CustomButton } from '../components/CustomButton'
import DropDownPicker from 'react-native-dropdown-picker'

const ALL_TASKS = "all_tasks";
const FINISHED_TASKS = "finished_tasks";
const NON_FINISHED_TASKS = "non_finished_tasks";

export default function TodosScreen ({ route, navigation }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [original, setOriginal] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    // DropDown Picker
    DropDownPicker.setTheme("DARK");
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

    const doCreateTask = () => {
        setLoading(true);
        createTask(text, route.params.id, token)
        .then(response => {
            const result = [...data, ...response.tasks];
            setData(result);
            setOriginal(result);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
        setText("");
    };

    const checkTasks = (boolean) => {
        const all = original.map(item => {
            return {id: item.id, content: item.content, done: boolean, belongsTo: item.belongsTo};
        });
        setOriginal(all);
        setData(all);
    }

    useEffect(() => {
        if (original.length === 0) {
            tasks(route.params.id, token)
            .then(taskLists => {
                const result = taskLists.tasks.filter(item => item.belongsTo != null);
                setData(result);
                setOriginal(result);
                setLoading(false);
            })
        }
        setCount(original.filter(item => item.done).length);
    }, [data]);

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <View style={styles.body}>
                            <Input
                                style={{marginTop: 20}}
                                onPress={doCreateTask}
                                text={text}
                                onChangeText={setText}
                                data={data}
                                placeholder="Nouvelle Tâche"
                            />
                            <Text style={styles.title}>Liste des tâches</Text>
                            <Text style={styles.subtitle}>{route.params.todolist}</Text>
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
                            <Text style={[styles.subtitle, {marginTop: 10}]}>Nombre de tâches réalisées : {count}</Text>
                            <FlatList 
                                style={{width: "70%"}}
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => <TaskCard item={item} changeCount={changeCount} deleteTask={
                                    () => {
                                        deleteTaskById(item.id, token)
                                        .then(json => {
                                            const newResult = original.filter(value => (value.id != item.id));
                                            setOriginal(newResult);
                                            setData(newResult);
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                    }
                                } style={{marginTop: 10}}/>}
                                />
                                {
                                    loading ? 
                                    <ActivityIndicator color="#999999" size="large"/>
                                    :
                                    <></>
                                }
                        </View>
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