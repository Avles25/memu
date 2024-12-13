<?PHP
/*
Simfatic Forms Main Form processor script

This script does all the server side processing. 
(Displaying the form, processing form submissions,
displaying errors, making CAPTCHA image, and so on.) 

All pages (including the form page) are displayed using 
templates in the 'templ' sub folder. 

The overall structure is that of a list of modules. Depending on the 
arguments (POST/GET) passed to the script, the modules process in sequence. 

Please note that just appending  a header and footer to this script won't work.
To embed the form, use the 'Copy & Paste' code in the 'Take the Code' page. 
To extend the functionality, see 'Extension Modules' in the help.

*/

@ini_set("display_errors", 1);//the error handler is added later in FormProc
error_reporting(E_ALL);

require_once(dirname(__FILE__)."/includes/Memucan-lib.php");
$formproc_obj =  new SFM_FormProcessor('Memucan');
$formproc_obj->initTimeZone('default');
$formproc_obj->setFormID('f9e27da0-8e11-418b-b852-0702d52067c5');
$formproc_obj->setRandKey('a08d1e5b-580f-4ffc-b430-0c30d97b2609');
$formproc_obj->setFormKey('13c8fe4a-1b6a-4ea0-aeaa-72f79cc882de');
$formproc_obj->setLocale('en-IN','dd-MM-yyyy');
$formproc_obj->setEmailFormatHTML(true);
$formproc_obj->EnableLogging(false);
$formproc_obj->SetDebugMode(false);
$formproc_obj->setIsInstalled(true);
$formproc_obj->SetPrintPreviewPage(sfm_readfile(dirname(__FILE__)."/templ/Memucan_print_preview_file.txt"));
$formproc_obj->SetSingleBoxErrorDisplay(true);
$formproc_obj->setFormPage(0,sfm_readfile(dirname(__FILE__)."/templ/Memucan_form_page_0.txt"));
$formproc_obj->AddElementInfo('name','text','');
$formproc_obj->AddElementInfo('Email','email','');
$formproc_obj->AddElementInfo('Phone','telephone','');
$formproc_obj->AddElementInfo('Multiline','multiline','');
$formproc_obj->SetHiddenInputTrapVarName('t094550518a9a6a50be1c');
$formproc_obj->SetFromAddress('sales@memucantechnology.net');
$page_renderer =  new FM_FormPageDisplayModule();
$formproc_obj->addModule($page_renderer);

$validator =  new FM_FormValidator();
$validator->addValidation("name","required","Please fill in name");
$validator->addValidation("name","alpha","The input for name should be a valid alphabetic value");
$validator->addValidation("Email","email","The input for  should be a valid email value");
$validator->addValidation("Email","required","Please fill in Email");
$validator->addValidation("Phone","required","Please fill in Phone");
$validator->addValidation("Multiline","required","Please fill in Multiline");
$formproc_obj->addModule($validator);

$data_email_sender =  new FM_FormDataSender(sfm_readfile(dirname(__FILE__)."/templ/Memucan_email_subj.txt"),sfm_readfile(dirname(__FILE__)."/templ/Memucan_email_body.txt"),'%Email%');
$data_email_sender->AddToAddr('Sales-Memucan <sales@memucantechnology.net>');
$formproc_obj->addModule($data_email_sender);

$autoresp =  new FM_AutoResponseSender(sfm_readfile(dirname(__FILE__)."/templ/Memucan_resp_subj.txt"),sfm_readfile(dirname(__FILE__)."/templ/Memucan_resp_body.txt"));
$autoresp->SetToVariables('name','Email');
$formproc_obj->addModule($autoresp);

$tupage =  new FM_ThankYouPage();
$tupage->SetRedirURL('https://www.memucantechnology.net/contact-us/thankyou.html');
$formproc_obj->addModule($tupage);

$page_renderer->SetFormValidator($validator);
$formproc_obj->ProcessForm();

?>