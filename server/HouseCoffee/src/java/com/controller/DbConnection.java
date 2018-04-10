
package com.controller;
import java.sql.*;
import java.util.*;


public class DbConnection {
    private Connection con;
    private Statement st;
    private ResultSet rs;
    
    public DbConnection(){
        try{
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/paddys","root","root");
            st = con.createStatement();
        }catch(Exception ex){
            System.out.println("error: " +ex);
        }
    }
    
    public String[][] getAll(){
        ArrayList<String[]> empData = new ArrayList<>();
        try{
            String query = "select * from employees order by `employees`.`employee_id` asc";
            rs = st.executeQuery(query);
            while(rs.next()){
                String employee = rs.getString("name");
                String supervisor = rs.getString("supervisor");
                int empIdInt = rs.getInt("employee_id");
                String empId = String.valueOf(empIdInt);
                String phone = rs.getString("phone_number");
                String[] dataComp = new String[]{"'"+employee+"'", "'"+empId+"'", "'"+phone+"'", "'"+supervisor+"'"};
                empData.add(dataComp);
            }
            
        }catch(Exception ex){
            System.out.println("error: " +ex);
        }
        String[][] returnData = new String[empData.size()][];
        returnData = empData.toArray(returnData);
        return returnData;
    }
    
    public boolean addEmployee(String name, String id, String phone, String supervisor){
        boolean added;
        try{
            String query = "insert into employees (employee_id, name, phone_number, supervisor) values ("
                +id+", '"+name+"', '"+phone+"', '"+supervisor+"')";
            st.executeUpdate(query);
            
            added = true;
        }catch(Exception ex){
            System.out.println("error at adding employees: "+ex);
            added = false;
        }
        return added;
    }
    
    public String[][] searchById(String id){
        ArrayList<String[]> empData = new ArrayList<>();
        try{
            String query = "select * from employees where `employee_id` like "+id;
            rs = st.executeQuery(query);
            while(rs.next()){
                String employee = rs.getString("name");
                String supervisor = rs.getString("supervisor");
                int empIdInt = rs.getInt("employee_id");
                String empId = String.valueOf(empIdInt);
                String phone = rs.getString("phone_number");
                String[] dataComp = new String[]{"'"+employee+"'", "'"+empId+"'", "'"+phone+"'", "'"+supervisor+"'"};
                empData.add(dataComp);
            }
            
        }catch(Exception ex){
            System.out.println("error: " +ex);
        }
        String[][] returnData = new String[empData.size()][];
        returnData = empData.toArray(returnData);
        return returnData;
    }
    
    public String[][] searchByName(String name){
        ArrayList<String[]> empData = new ArrayList<>();
        String search = "select * from employees where `name` like ?";
        try{
            PreparedStatement statement = con.prepareStatement(search);
            statement.setString(1, name);
            System.out.println(statement);
            rs = statement.executeQuery();
            while(rs.next()){
                String employee = rs.getString("name");
                String supervisor = rs.getString("supervisor");
                int empIdInt = rs.getInt("employee_id");
                String empId = String.valueOf(empIdInt);
                String phone = rs.getString("phone_number");
                String[] dataComp = new String[]{"'"+employee+"'", "'"+empId+"'", "'"+phone+"'", "'"+supervisor+"'"};
                empData.add(dataComp);
            }
            
        }catch(Exception ex){
            System.out.println("error: " +ex);
        }
        String[][] returnData = new String[empData.size()][];
        returnData = empData.toArray(returnData);
        return returnData;
    }
    
    public boolean deleteEmp(String id){
        boolean deleted;
        try{
            String query = "delete from employees where employee_id="+id;
            st.executeUpdate(query);
            deleted = true;
        }catch(Exception ex){
            System.out.println("error at delete employee: "+ex);
            deleted = false;
        }
   
        return deleted;
    }
    
    public boolean checkLogin(String userName, String passWord){
        boolean pass;
        String search = "select * from user where user_id= ? and password=PASSWORD( ? )";
        try{
            pass = false;
            PreparedStatement statement = con.prepareStatement(search);
            statement.setString(1, userName);
            statement.setString(2, passWord);
            System.out.println(statement);
            rs = statement.executeQuery();
            while(rs.next()){
                pass = true;
            }
        }catch(Exception ex){
            System.out.println("error at log in check: " +ex);
            pass = false;
        }
        return pass;
    }
}
