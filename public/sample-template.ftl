<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Enhanced Resume</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .experience-item {
            margin-bottom: 20px;
        }
        .job-title {
            font-weight: bold;
            font-size: 16px;
        }
        .company {
            font-style: italic;
            color: #7f8c8d;
        }
        .date {
            float: right;
            color: #7f8c8d;
        }
        ul {
            margin: 10px 0;
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <!-- TODO: FreeMarker template for resume generation -->
    <div class="header">
        <h1>${name!'[Name]'}</h1>
        <p>${email!'[Email]'} | ${phone!'[Phone]'} | ${location!'[Location]'}</p>
    </div>
    
    <div class="section">
        <div class="section-title">PROFESSIONAL SUMMARY</div>
        <p>${summary!'Professional summary will be generated here...'}</p>
    </div>
    
    <div class="section">
        <div class="section-title">EXPERIENCE</div>
        <!-- Experience items will be populated here -->
    </div>
    
    <div class="section">
        <div class="section-title">EDUCATION</div>
        <!-- Education items will be populated here -->
    </div>
    
    <div class="section">
        <div class="section-title">SKILLS</div>
        <!-- Skills will be populated here -->
    </div>
</body>
</html>
