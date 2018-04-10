
package com.controller;

import java.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;




@Controller
@RequestMapping
public class DefaultController {
    DbConnection conn = new DbConnection();
    
    @RequestMapping
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView("index");
        mv.addObject("message", "hi hi hi hi hi hi hi");
//        DbConnection conn = new DbConnection();
        String[][] testArr = conn.getAll();
        System.out.println(Arrays.deepToString(testArr));
        return mv;
    }
    
    @RequestMapping(value="/get_all", method = RequestMethod.GET)
    public @ResponseBody String getData(){
//        DbConnection conn = new DbConnection();
        String[][] testArr = conn.getAll();
        String returnStr = Arrays.deepToString(testArr);
        return returnStr;   
    }
    
    @RequestMapping(value="/add_emp", method = RequestMethod.POST)
    public @ResponseBody String addPerson(
            @RequestParam("name") String name,
            @RequestParam("id") String id,
            @RequestParam("phone") String phone,
            @RequestParam("supervisor") String supervisor){
        
        boolean[] result = new boolean[]{conn.addEmployee(name, id, phone, supervisor)};
        String returnStr = Arrays.toString(result);
        return returnStr;
    }
    
    @RequestMapping(value="/search_id", method = RequestMethod.GET)
    public @ResponseBody String searchById(@RequestParam("id") String id){
        String[][] searchResult = conn.searchById(id);
        String returnStr = Arrays.deepToString(searchResult);
        return returnStr;
    }
    
    @RequestMapping(value="/search_firstname", method = RequestMethod.GET)
    public @ResponseBody String searchByFirstName(@RequestParam("name") String name){
//        String nameStr = name.replace("%22", "\"");
//        System.out.println(name);
        String nameStr = name+"%";
//        System.out.println(nameStr);
        String[][] searchResult = conn.searchByName(nameStr);
        String returnStr = Arrays.deepToString(searchResult);
        return returnStr;  
    }
    
    @RequestMapping(value="/search_lastname", method = RequestMethod.GET)
    public @ResponseBody String searchByLastName(@RequestParam("name") String name){
//        String nameStr = name.replace("%22", "\"");
//        System.out.println(name);
        String nameStr = "%"+name+"%";
//        System.out.println(nameStr);
        String[][] searchResult = conn.searchByName(nameStr);
        String returnStr = Arrays.deepToString(searchResult);
        return returnStr;  
    }
    
    @RequestMapping(value="/delete_emp", method = RequestMethod.DELETE)
    public @ResponseBody String deletePerson(@RequestParam("id") String id){
        boolean[] result = new boolean[]{conn.deleteEmp(id)};
        String returnStr = Arrays.toString(result);
        return returnStr;
    }
    
    @RequestMapping(value="/user_check", method = RequestMethod.GET)
    public @ResponseBody String checkUser(@RequestParam("userName") String uName, @RequestParam("passWord") String passWord){
        System.out.println(" at spring mvc :" +uName + " "+ passWord);
        boolean[] result = new boolean[]{conn.checkLogin(uName, passWord)};
        String returnStr = Arrays.toString(result);
        return returnStr;
    }
}



