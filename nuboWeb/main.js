/*
작성자: 차민주
작성일시: 2021-07-05
파일명: 파일 업로드 페이지 서버코드
설명: 파일 업로드 페이지를 관리하는 Nodejs기반 서버코드입니다.
*/
var path = require("path");
var fs = require("fs");
var ejs = require("ejs");
var http = require("http");
var mysql = require("mysql");
var express = require("express");
var multer = require("multer");
var msg = require("dialog");
var url = require("url");
//객체 로드(fs, ejs, http, mysql, express, multer, dialog)
var connetion = mysql.createConnection({
  host: "127.0.0.1",
  user: "nodejs",
  password: "123456",
  database: "test",
  port: "3300",
  multipleStatements: true,
});
var connetion2 = mysql.createConnection({
  host: "10.10.0.130",
  user: "root",
  password: "password",
  database: "nubo",
  port: "3306",
  multipleStatements: true,
});
//서버에 올릴 시, host : 10.10.0.90, user : web, port :3306
/*
mariaDB 연동
 - 로컬 PC의 DB와 연결("127.0.0.1" or "localhost")
 - database는 "test"를 가져옴
 - port번호 3300 지정(보통 3308), 로컬 PC
*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/app/");
  }, // cb 콜백함수를 통해 전송된 App파일 저장 디렉토리 설정
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
}); // post로 전송된 파일의 저장경로와 파일명 등을 처리하기 위한 첫번째 DiskStorage 엔진 설정
var upload_app = multer({ storage: storage }); //multer에 첫번째 DiskStorage 적용

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/corp/");
  }, // cb 콜백함수를 통해 전송된 기업 정보 파일 저장 디렉토리 설정
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
}); // post로 전송된 파일의 저장경로와 파일명 등을 처리하기 위한 두번째 DiskStorage 엔진 설정
var upload_corp = multer({ storage: storage }); //multer에 두번째 DiskStorage 적용

var app = express(); //nodejs의 대표 프레임 워크인 express를 사용
http.createServer(app).listen(5500, function () {
  console.log("Server running at http://10.10.0.90:5500");
}); //5500포트에 서버를 생성

mypath = path.join(__dirname + "/dist/"); // 절대경로 설정
app.use("/dist", express.static(mypath)); // "/dist"가 읽어질 경우 현재 위치를 절대 경로 지정

/* 메인 페이지(index.html) 읽기*/
app.get("/", function (req, res) {
  res.sendfile(mypath + "/views/index.html");
});

/* 실시간 이용자 분석 차트 페이지(charts.html) 읽기*/
app.get("/charts", function (req, res) {
  res.sendFile(mypath + "/views/charts.html");
});

app.get("/b", function (req, res) {
  res.sendfile(mypath + "/views/b.html");
});

/* 기업별 다운로드 페이지(corp_template.html) 읽기*/
app.get("/corp_template", function (req, res) {
  var queryData = url.parse(req.url, true).query;
  console.log(queryData.id + " 앱 다운로드 페이지 접속");
  function getGender(event) {
    document.getElementById("result").innerText = event.target.value;
  }
  fs.readFile(mypath + "/views/corp_template.html", "utf8", function (
    error,
    data
  ) {
    connetion.query(
      "select * from nubo where corp = ?",
      [queryData.id],
      function (error, result) {
        if (error) {
          console.log(
            queryData.id + " 앱 다운로드 페이지 접속 실패 - readfile error!!"
          );
        } else {
          res.send(
            ejs.render(data, {
              dbList: result,
            }) // userfile에 해당하는 파일의 정보를 ejs렌더링하여 보낸 후 edit.html을 불러옴
          );
        }
      }
    );
  });
});

/* 앱 관리 페이지(list.html) 읽기*/
app.get("/list", function (req, res) {
  fs.readFile(mypath + "/views/list.html", "utf8", function (error, data) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query("select * from nubo where delete_yn = '0' ", function (
        error,
        results
      ) {
        if (error) {
          console.log("error : ", error.message);
        } else {
          res.send(
            ejs.render(data, {
              dbList: results,
            }) //delete_yn을 통해 DB의 데이터값을 ejs렌더링하여 dbList에 담아 전송하고 list.html파일을 읽어옴
          );
        }
      });
    }
  });
});

/* 기업 리스트 페이지(download.html) 읽기*/
app.get("/download", function (req, res) {
  fs.readFile(mypath + "/views/download.html", "utf8", function (error, data) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query("select * from corp_list ", function (error, results) {
        if (error) {
          console.log("error : ", error.message);
        } else {
          res.send(
            ejs.render(data, {
              dbList: results,
            }) //delete_yn을 통해 DB의 데이터값을 ejs렌더링하여 dbList에 담아 전송하고 list.html파일을 읽어옴
          );
        }
      });
    }
  });
});

/* 업로드 페이지(upload.html) 읽기 */
app.get("/upload", function (req, res) {
  fs.readFile(mypath + "/views/upload.html", "utf8", function (error, data) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query("select * from corp_list", function (error, results) {
        if (error) {
          console.log("error : ", error.message);
        } else {
          res.send(
            ejs.render(data, {
              dbList: results,
            }) //DB의 데이터값중 corp값을 ejs렌더링하여 dbList에 담아 전송하고 upload.html파일을 읽어옴
          );
        }
      });
    }
  });
});

/* 업로드 페이지(upload.html) 요청-post(정보전달) */
app.post("/upload", upload_app.single("userfile"), function (req, res) {
  //뮬터를 이용하여 싱글 파일을 업로드 함
  var body = req.body; //페이지에 있는 정보값을 바디값으로 가져옴
  var fileName = req.file.originalname;
  var fileOS = "ios"; //os의default값 적용
  var fileType = "cellular"; //prod의 default값 적용
  var L = fileName.length;
  var fileOS = fileName.substring(L - 3, L); // os 추출
  if (fileOS == "apk") fileOS = "Android";
  // 1. Android의 경우
  else if (fileOS == "ipa") {
    fileOS = "ios";
  } // 2. iOS의 경우
  var fileType = fileName.substring(L - 8, L - 4); // type 추출
  if (fileType == "prod") fileType = "cellular";
  else if (fileType == "wifi") fileType = "cellular + Wifi";
  if (body.os == "Android" || body.os == "ios") {
    //os의 라디오 버튼이 체크되어 있다면 그 값을 우선으로 함
    fileOS = body.os;
  }
  if (body.type == "Wifi included") {
    //type의 라디오 버튼이 체크되어 있다면 그 값을 우선으로 함
    fileType = body.type;
  }
  var fileVersion = fileName.substring(L - 15, L - 9);
  connetion.query(
    "insert into nubo (userfile,os,version,type,package,types,corp,comment) values(?,?,?,?,?,?,?,?)",
    [
      fileName,
      fileOS,
      fileVersion,
      fileType,
      body.package,
      body.types,
      body.corp,
      body.comment,
    ], //body객체를 통해 현재 입력 값을 읽어서 nubo테이블에 저장
    function (error, result) {
      if (error) {
        console.log("Insert Error : ", error.message);
      } else {
        console.log(req.file.originalname + "   업로드 완료!");
        res.redirect("/list"); //메인 페이지로 리워드
      }
    }
  );
});

/* 임시 삭제 처리(url을 통해 userfile정보를 가져와서 삭제)  */
app.get("/delete/:userfile", function (req, res) {
  fs.rename(
    `${path.dirname(__filename)}/uploads/app/${req.params.userfile}`,
    `${path.dirname(__filename)}/temp/app/${req.params.userfile}`, //userfile에 해당하는 파일을 uploads폴더에서 temp폴더로 이동(휴지통으로 이동)
    function (error) {
      if (error) {
        console.log("Delete File Error");
      } else {
        console.log("%s move to temp", req.params.userfile);
      }
    }
  );
  connetion.query(
    // UPDATE [테이블] SET [열] = '변경할값'
    "update nubo set delete_yn = '1' where userfile = ?", //userfile에 해당하는 파일의 delete_yn값을 1로 바꿈(메인 페이지가 아닌 휴지통 페이지에 띄움)
    [req.params.userfile],
    function (error, result) {
      if (error) {
        console.log("delete Error");
      } else {
        console.log("delete userfile = %s", req.params.userfile);
        res.redirect("/list");
      }
    }
  );
}); //파일을 휴지통 폴더로 이동한 후 delete_yn을 바꿈으로 명시해줌

/* 세부정보 확인 페이지(specify.html) 읽기 */
app.get("/specify/:userfile", function (req, res) {
  fs.readFile(mypath + "/views/specify.html", "utf8", function (error, data) {
    connetion.query(
      "select * from nubo where userfile = ?",
      [req.params.userfile],
      function (error, result) {
        if (error) {
          console.log("ReadFile Error");
        } else {
          res.send(
            ejs.render(data, {
              dbList: result[0],
            }) // userfile에 해당하는 파일의 정보를 ejs렌더링하여 보낸 후 specify.html을 불러옴
          );
        }
      }
    );
  });
});

/* 수정 페이지(edit.html) 읽기 */
app.get("/edit/:userfile", function (req, res) {
  fs.readFile(mypath + "/views/edit.html", "utf8", function (error, data) {
    connetion.query(
      "select * from nubo where userfile = ?",
      [req.params.userfile],
      function (error, result) {
        if (error) {
          console.log("ReadFile Error");
        } else {
          res.send(
            ejs.render(data, {
              db: result[0],
            }) // userfile에 해당하는 파일의 정보를 ejs렌더링하여 보낸 후 edit.html을 불러옴
          );
        }
      }
    );
  });
});

/* 수정 페이지(edit.html) 요청-post */
app.post("/edit/:userfile", upload_app.single("userfile"), function (req, res) {
  //뮬터를 이용하여 싱글 파일을 업로드 함
  var body = req.body;
  connetion.query(
    "update nubo set comment=?, version=?, types=?, package=? where userfile=?",
    [body.comment, body.version, body.types, body.package, req.params.userfile],
    function (error, result) {
      if (error) {
        console.log("Update Error : ", error.message);
      } else {
        console.log(
          "file info change!!\n" + body.comment,
          body.version,
          body.types,
          body.package,
          req.params.userfile
        );
        res.redirect("/list");
      }
    }
  ); //body에 입력한 업데이트 값을 userfile값을 통해 DB에 업데이트 하고 파일을 새로 올림
});

/* plist 페이지(plist.html) 요청*/
app.post("/edit/:userfile", upload_app.single("userfile"), function (req, res) {
  //뮬터를 이용하여 싱글 파일을 업로드 함
  var body = req.body;
  connetion.query(
    "update nubo set comment=? where userfile=?",
    [body.comment, req.params.userfile],
    function (error, result) {
      if (error) {
        console.log("Update Error : ", error.message);
      } else {
        res.redirect("/list");
      }
    }
  ); //body에 입력한 업데이트 값을 userfile값을 통해 DB에 업데이트 하고 파일을 새로 올림
});

/* 관리페이지에서 앱 다운로드 처리 */
app.get("/uploads/:name", function (req, res) {
  //name값을 통해 해당하는 값을 파악
  var filename = req.params.name;
  var file = __dirname + "/uploads/app/" + filename; //파일 경로를 완성함
  if (fs.existsSync(file)) {
    console.log(filename + " is downloaded!!");
    res.download(file);
  } else {
    msg.err("해당 파일이 없습니다.");
  }
}); //경로에 파일이 있다면 다운로드 함

/* 기업페이지에서 앱 다운로드 처리 */
app.get("/downloads/:name", function (req, res) {
  var filename = req.params.name;
  var file = __dirname + "/uploads/app/" + filename; //파일 경로를 완성함
  if (fs.existsSync(file)) {
    console.log(filename + " is downloaded!!");
    res.download(file);
  } else {
    msg.err("해당 파일이 없습니다.");
  }
});

/* 휴지통 페이지(temp.html) 읽기 */
app.get("/temp", function (req, res) {
  fs.readFile(mypath + "/views/temp.html", "utf8", function (error, data) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query("select * from nubo where delete_yn = '1' ", function (
        error,
        results
      ) {
        if (error) {
          console.log("error : ", error.message);
        } else {
          res.send(
            ejs.render(data, {
              dbList: results,
            })
          );
        }
      });
    }
  });
});

/* 완전 삭제 처리 */
app.get("/r_delete/:userfile", function (req, res) {
  fs.unlink(
    `${path.dirname(__filename)}/temp/app/${req.params.userfile}`, //경로에 해당하는 파일 삭제
    function (error) {
      if (error) {
        console.log("error : " + error);
      } else {
        console.log("%s is  permanent deleted", req.params.userfile);
      }
    }
  );
  connetion.query(
    "delete from nubo where userfile = ?",
    [req.params.userfile],
    function (error, result) {
      if (error) {
        console.log("delete Error");
      } else {
        console.log("delete userfile = %s", req.params.userfile);
        res.redirect("/temp");
      } //userfile에 해당하는 파일을 DB에서 삭제
    }
  );
});

/* 복원 처리 */
app.get("/recover/:userfile", function (req, res) {
  fs.rename(
    `${path.dirname(__filename)}/temp/app/${req.params.userfile}`,
    `${path.dirname(__filename)}/uploads/app/${req.params.userfile}`, //userfile에 해당하는 파일을 uploads폴더로 복원함
    function (error) {
      if (error) {
        console.log("Recover File Error");
        console.log("error : " + error);
      } else {
        console.log("%s is recover and move to list", req.params.userfile);
      }
    }
  );
  connetion.query(
    // UPDATE [테이블] SET [열] = '변경할값'
    "update nubo set delete_yn = '0' where userfile = ?", //delete_yn값을 변경하여 메인 페이지에 띄우도록 함
    [req.params.userfile],
    function (error, result) {
      if (error) {
        console.log("Recover Error");
      } else {
        console.log(req.params.userfile);
        console.log("Recover userfile = %s", req.params.userfile);
        res.redirect("/temp"); // 휴지통 페이지로 리워드
      }
    }
  );
});
///////////////////////////////////////////////////////////////////
// 기업 관리 페이지 코드 시작
app.get("/corp_list", function (req, res) {
  fs.readFile(mypath + "/views/corp_list.html", "utf8", function (error, data) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query(
        "select * from corp_list where delete_yn = '0'",
        function (error, results) {
          if (error) {
            console.log("error : ", error.message);
          } else {
            res.send(
              ejs.render(data, {
                dbList: results,
              }) //delete_yn을 통해 DB의 데이터값을 ejs렌더링하여 dbList에 담아 전송하고 corp_list.html파일을 읽어옴
            );
          }
        }
      );
    }
  });
});

/* 업로드 페이지(corp_upload.html) 읽기 */
app.get("/corp_upload", function (req, res) {
  fs.readFile(mypath + "/views/corp_upload.html", "utf8", function (
    error,
    data
  ) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query("select * from corp_list", function (error, results) {
        if (error) {
          console.log("error : ", error.message);
        } else {
          res.send(
            ejs.render(data, {
              dbList: results,
            }) //DB의 데이터값중 corp값을 ejs렌더링하여 dbList에 담아 전송하고 corp_upload.html파일을 읽어옴
          );
        }
      });
    }
  });
});

/* 업로드 페이지(corp_upload.html) 요청-post(정보전달) */
app.post("/upload-multiple", upload_corp.array("file", 2), function (req, res) {
  //뮬터를 이용하여 다중 파일을 업로드 함
  var body = req.body; //페이지에 있는 정보값을 바디값으로 가져옴
  connetion.query(
    "insert into corp_list (corp,app_img,logo_img,descript) values(?,?,?,?)",
    [
      body.corp,
      req.files[0].originalname,
      req.files[1].originalname,
      body.descript,
    ], //body객체를 통해 현재 입력 값을 읽어서 corp_list테이블에 저장
    function (error, result) {
      if (error) {
        console.log("Insert Error : ", error.message);
      } else {
        console.log(body.corp + "   기업 정보 업로드 완료!");
        res.redirect("/corp_list"); //기업 정보 메인 페이지 리워드
      }
    }
  );
});

/* 기업 정보 삭제 - 기업 정보(기업명, 이미지파일)를 휴지통으로 이동함*/
app.get("/corp_delete/", function (req, res) {
  fs.rename(
    `${path.dirname(__filename)}/uploads/corp/${req.param("app_img")}`,
    `${path.dirname(__filename)}/temp/corp/${req.param("app_img")}`,
    function (error) {
      if (error) {
        console.log("Delete Corp File1 Error : %s", req.param("app_img"));
      } else {
        console.log("%s move to temp", req.params.app_img);
      }
    }
  );
  fs.rename(
    `${path.dirname(__filename)}/uploads/corp/${req.param("logo_img")}`,
    `${path.dirname(__filename)}/temp/corp/${req.param("logo_img")}`, //corp에 해당하는 파일을 uploads폴더에서 temp폴더로 이동(휴지통으로 이동)
    function (error) {
      if (error) {
        console.log("Delete Corp File2 Error");
      } else {
        console.log("move to temp");
      }
    }
  );
  connetion.query(
    // UPDATE [테이블] SET [열] = '변경할값'
    "update corp_list set delete_yn = '1' where app_img = ?", //userfile에 해당하는 파일의 delete_yn값을 1로 바꿈(메인 페이지가 아닌 휴지통 페이지에 띄움)
    [req.param("app_img")],
    function (error, result) {
      if (error) {
        console.log("delete Error");
      } else {
        console.log("sql update!");
        res.redirect("/corp_list");
      }
    }
  );
});

/* 수정 페이지(corp_edit.html) 읽기 */
app.get("/corp_edit/:corp", function (req, res) {
  fs.readFile(mypath + "/views/corp_edit.html", "utf8", function (error, data) {
    connetion.query(
      "select * from corp_list where corp = ?",
      [req.params.corp],
      function (error, result) {
        if (error) {
          console.log("ReadFile Error");
        } else {
          res.send(
            ejs.render(data, {
              db: result[0],
            }) // userfile에 해당하는 파일의 정보를 ejs렌더링하여 보낸 후 corp_edit.html을 불러옴
          );
        }
      }
    );
  });
});

/* 수정 페이지(corp_edit.html) 요청-post */
app.post("/corp_edit/:corp", upload_corp.array("file", 2), function (req, res) {
  //뮬터를 이용하여 싱글 파일을 업로드 함
  var body = req.body;
  connetion.query(
    "update corp_list set  corp=?, descript=? where corp=?",
    [body.corp, body.descript, req.params.corp],
    function (error, result) {
      if (error) {
        console.log("Update Error : ", error.message);
      } else {
        res.redirect("/corp_list");
      }
    }
  ); //body에 입력한 업데이트 값을 corp값을 통해 DB에 업데이트 하고 파일을 새로 올림
  // fs.unlink(
  //   `${path.dirname(__filename)}/uploads/corp/${req.param("app_img")}`, //업데이트 전 파일은 폴더에서 삭제함
  //   function (error) {
  //     if (error) {
  //       console.log("error : " + error);
  //     } else {
  //       console.log("%s is deleted", req.param("app_img"));
  //     }
  //   }
  // );
  // fs.unlink(
  //   `${path.dirname(__filename)}/uploads/corp/${req.param("logo_img")}`, //업데이트 전 파일은 폴더에서 삭제함
  //   function (error) {
  //     if (error) {
  //       console.log("error : " + error);
  //     } else {
  //       console.log("%s is deleted", req.param("logo_img"));
  //     }
  //   }
  // );
});

/* 휴지통 페이지(corp_temp.html) 읽기 */
app.get("/corp_temp", function (req, res) {
  fs.readFile(mypath + "/views/corp_temp.html", "utf8", function (error, data) {
    if (error) {
      console.log("readFile Error");
    } else {
      connetion.query(
        "select * from corp_list where delete_yn = '1' ",
        function (error, results) {
          if (error) {
            console.log("error : ", error.message);
          } else {
            res.send(
              ejs.render(data, {
                dbList: results,
              })
            );
          }
        }
      );
    }
  });
});

/* 완전 삭제 처리 */
app.get("/corp_r_delete/:corp", function (req, res) {
  fs.unlink(
    `${path.dirname(__filename)}/temp/corp/${req.param("app_img")}`, //업데이트 전 파일은 폴더에서 삭제함
    function (error) {
      if (error) {
        console.log("error : " + error);
      } else {
        console.log("%s is deleted", req.param("app_img"));
      }
    }
  );
  fs.unlink(
    `${path.dirname(__filename)}/temp/corp/${req.param("logo_img")}`, //업데이트 전 파일은 폴더에서 삭제함
    function (error) {
      if (error) {
        console.log("error : " + error);
      } else {
        console.log("%s is deleted", req.param("logo_img"));
      }
    }
  );
  var sql1 =
    "delete from corp_list where corp = ?;" +
    "delete from nubo where corp = ?;";
  connetion.query(sql1, [req.params.corp], function (error, result) {
    if (error) {
      console.log("delete Error" + error);
    } else {
      console.log("delete corp_file = %s", req.params.corp);
      res.redirect("/corp_temp");
    } //userfile에 해당하는 파일을 DB에서 삭제
  });
});

/* 복원 처리 */
app.get("/corp_recover/:corp", function (req, res) {
  var a = req.param("app_img");
  var b = req.param("logo_img");
  fs.rename(
    `${path.dirname(__filename)}/temp/corp/${a}`,
    `${path.dirname(__filename)}/uploads/corp/${a}`,
    function (error) {
      if (error) {
        console.log("Recover Corp File1 Error : %s", a);
      } else {
        console.log("move to temp");
      }
    }
  );
  fs.rename(
    `${path.dirname(__filename)}/temp/corp/${b}`,
    `${path.dirname(__filename)}/uploads/corp/${b}`, //corp에 해당하는 파일을 uploads폴더에서 temp폴더로 이동(휴지통으로 이동)
    function (error) {
      if (error) {
        console.log("Recover Corp File2 Error : %s", b);
      } else {
        console.log("move to temp");
      }
    }
  );
  connetion.query(
    // UPDATE [테이블] SET [열] = '변경할값'
    "update corp_list set delete_yn = '0' where corp = ?", //userfile에 해당하는 파일의 delete_yn값을 1로 바꿈(메인 페이지가 아닌 휴지통 페이지에 띄움)
    [req.params.corp],
    function (error, result) {
      if (error) {
        console.log("delete Error");
      } else {
        console.log("sql update!");
        res.redirect("/corp_list");
      }
    }
  );
});
