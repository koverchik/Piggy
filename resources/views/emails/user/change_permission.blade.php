<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]>
    <xml>
        <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
            <w:DontUseAdvancedTypographyReadingMail/>
        </w:WordDocument>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG/>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet" type="text/css"><!--<![endif]-->
    @vite(['resources/scss/colors.scss', 'resources/scss/email.scss'])
    <!--[if mso ]>
    <style>
        sup, sub {
            font-size: 100% !important;
        }

        sup {
            mso-text-raise: 10%
        }

        sub {
            mso-text-raise: -10%
        }
    </style>
    <![endif]-->
</head>
<body class="body"
      style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;">
    <tbody>
    <tr>
        <td>
            @include('emails.header')
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                   role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                <tbody>
                <tr>
                    <td>
                        <table class="row-content stack email-light-bg" align="center" border="0" cellpadding="0"
                               cellspacing="0"
                               role="presentation"
                               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px; margin: 0 auto;"
                               width="640">
                            <tbody>
                            <tr>
                                <td class="column column-1" width="100%"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
                                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0"
                                           cellspacing="0" role="presentation"
                                           style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                        <tr>
                                            <td class="pad" style="padding-left:20px;padding-right:20px;">
                                                <div
                                                    style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:14px;line-height:1.2;text-align:center;mso-line-height-alt:17px;">
                                                    <p style="margin: 0;">&nbsp;</p>
                                                    <p style="margin: 0; word-break: break-word;">
                                                        <span>
                                                            Hello, {{ $user->name ?? 'there' }}!
                                                        </span>
                                                    </p>
                                                    <p style="margin: 0;">&nbsp;</p>
                                                    <p style="margin: 0; word-break: break-word;">
                                                        The owner of the table, {{ $host->name }}, has changed your role
                                                        in "{{$name}}" to {{$level}}.
                                                    </p>
                                                    <p style="margin: 0;">&nbsp;</p>
                                                    <p style="margin: 0; word-break: break-word;">
                                                        You can check your access to the table by following the
                                                        <a class="link-primary-custom" href="{{$link}}">link</a>.
                                                    </p>
                                                    <p style="margin: 0;">&nbsp;</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            @include('emails.footer')
        </td>
    </tr>
    </tbody>
</table>
<!-- End -->
</body>
</html>
