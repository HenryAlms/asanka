# Asanka

Asanka Capstone Project. University of Washington Informatics Major 2018. 

Working with TechAide to redesign the User Experience for their Asanka Device. 

We made a slight change to the connection process removing the need to type “10.10.10.10” into the address bar every time you want to access the device through the web portal. The software needed to do this is already being used on the device and only one line of code needs to be added to make it work. In the /etc/dnsmasq.conf file on the device you need to add the line “address=/#/10.10.10.10”. This will return the address 10.10.10.10 for all domain names that are not hosted in the /etc/hosts file, and since that file is empty any address that is entered will return 10.10.10.10. With these new changes this is what steps to connect to an Asanka could look like:

Steps to connect to device:
1) Connect Asanka to power supply
2) A red light should turn on and stay on while a green light right next to it should blink twice in quick succession
3) Once the Asanka is on you should see a wifi signal named “ASANKA” appear on your device which you should then connect to.
4) After you have connected to the ASANKA signal, open a browser on your device and navigate to “myasanka.com” in the address bar.
5) Log into your Asanka account on the webpage.

Security issue: On /index.php from the device side, if you click on the Admin tab at the top right corner of the screen you will be logged into an admin account and brought to the admin page. On this page you have permission to edit the admin account in any way you choose including deleting the accounts entirely. As soon as you leave the admin page however, the tab goes away. 

ACA Page Before

![alt text](https://github.com/HenryAlms/asanka/blob/master/images/image1.png)

ACA Page After Redesign

![alt text](https://github.com/HenryAlms/asanka/blob/master/images/image2.png)

These are the before and after of our redesign of the ACA dashboard. While it has the same general feel, there are many little things that we changed to help make Asanka better to use and easier to understand. I will now list all of the changes that we made to the ACA content management interface and our reasoning behind each one.

- First and foremost we adjusted the way that information is stored and accessed to make it easier to find and work with the data. Instead of using a single bucket to store all of the files on the Asanka, we used a cascading file system similar to Google Drive. The files will be stored based on school subject, grade level, and teacher. This will allow the admin to split up the content stored on the device based on who will be using it making the files easier to look for. You can see in the second screen shot that there is now a section labeled “Folders” which has various subjects listed, these are the folders that are contained in the main bucket that you can navigate too. If you were to click into the “English” folder, the “Files” section would only list the content contained in the English folder and the “Folders” section would contain all of the folders that are stored.

- Admins can now edit the content of multiple devices under one account, which can be changed from the “Choose A Device” drop down menu on the dashboard. Allowing for one person to control multiple devices gives the admin team a much easier time managing all of the devices at a school or workplace. 

- We removed the entries statistics at the top of the dashboard since the number of entries that is stored on the device is not as helpful for an admin. If you were to show storage stats on the dashboard it would be better to display the amount of storage that is currently being taken up and how much is free. 

- A search bar was not implemented because we did not have the time to do so, but we recommend keeping the search bar functionality and putting it to the left of the “Add New File” button. 

- In the area where the add new button and active/inactive filters used to be, we replaced them with an “Add New File” button and an “Edit” button. The “Add New File” button works the same functionally as the old add new button and will prompt the user to add a new file once clicked. The “Edit” button will make checkboxes appear next to each file listed. These checkboxes will allow the user to delete multiple files at once if they are selected. We also added the icon and “Files” label above the containers that houses the list of files stored on the device to make things very clear. 

- We adjusted the information that is being displayed about each file to the user. Date added, title, categories, attachments, status and actions were the original columns that were being displayed about the files but we do not think those are the best attributes to show. We decided to use title, size (in KB), time uploaded, and status (dropdown menu that will allow you to quickly make a file active/inactive) columns to try and convey relevant information to the user about the files. We think that giving the size of a file rather than the number of attachments will give the user a better gauge of how much space a particular file is taking up. Time uploaded will include the date and exact time that a file was uploaded to the device to help the admin keep track of files and when they were added. The new status column will contain a drop down menu for each file that will allow an admin to quickly switch a files status from active to inactive. Giving the users helpful and useful information about the content that is being stored on the Asanka will help them make better decisions around how they manage their content.

- Below are the before and after screenshots of the “Add New Content” feature. We felt that the current form to add content is not focusing on the right parts of uploading content. Most of the files that schools are going to be using are already created so they will primarily be using the “Add File” button that is tucked away in the corner. The current new content form is focusing more on the text box editor which will not be used as often, so we wanted to redesign the form to make it more clear to the users how to upload their own files. Our updated version allows the user to choose where the file they are uploading is going to be stored and is more focused on uploading files rather than adding text documents. 

Before

![alt text](https://github.com/HenryAlms/asanka/blob/master/images/image3.png)

After

![alt text](https://github.com/HenryAlms/asanka/blob/master/images/image4.png)

- In our new "Add New File" page we have the admin create a title, select the upload date, add a description, and select where they want to store the file. The admin will then add the file at the bottom and hit the submit button to add the selected file to the asanka devices
