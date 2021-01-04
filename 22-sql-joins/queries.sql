-- write your queries here
-- Join the two tables so that every column and record appears, regardless of if there is not an owner_id. Your output should look like this:
SELECT * FROM owners FULL JOIN vehicles ON owners.id = vehicles.owner_id;


-- Count the number of cars for each owner. Display the owners first_name, last_name and count of vehicles. The first_name should be ordered in ascending order. Your output should look like this:
SELECT 
    a.first_name, a.last_name , COUNT(*) AS count 
FROM 
    owners AS a JOIN vehicles AS b ON a.id = b.owner_id 
GROUP BY a.id 
ORDER BY a.first_name;


-- Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name, last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000. Your output should look like this:
SELECT 
    a.first_name, a.last_name , ROUND(AVG(b.price)) AS average_price,  COUNT(*) AS count 
FROM 
    owners AS a JOIN vehicles AS b ON a.id = b.owner_id 
GROUP BY 
    a.id HAVING COUNT(*) > 1 AND AVG(b.price) > 10000 
ORDER BY 
    a.first_name DESC;
