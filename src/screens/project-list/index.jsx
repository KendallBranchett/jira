import React from 'react';
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject } from 'utils';
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    useEffect(() => {
      //当用户输入关键词或选择select框时,param变化，param变化时请求工程列表
      fetch(`${apiUrl}/users`).then(async res => { 
          if(res.ok) {
            setUsers(await res.json())
            console.log('users', users)
          }
      })
    },[])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
            if(res.ok) {
              setList(await res.json())
            }
        })
      },[param])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}