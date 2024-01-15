const z = require("zod");

//signup
function vsignup(obj) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const res = schema.safeParse(obj);
  return res;
}

//login
function vlogin(obj) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const res = schema.safeParse(obj);
  return res;
}

//topics
function vtopics(userid) {
  const schema = z.string().min(1);
  const res = schema.safeParse(userid);
  return res;
}

//addtopic
function vaddtopic(obj) {
  const schema = z.object({
    userid: z.string(),
    title: z.string(),
    time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
  });
  const res = schema.safeParse(obj);
  return res;
}

//updatetopic
function vupdatetopic(obj) {
  const schema = z.object({
    userid: z.string(),
    title: z.string(),
    edit: z.string(),
    del: z.string(),
  });
  const res = schema.safeParse(obj);
  return res;
}

//thoughts
function vthoughts(topicid) {
  const schema = z.string().min(4);
  const res = schema.safeParse(topicid);
  return res;
}

//addthought
function vaddthought(obj) {
  const schema = z.object({
    topicid: z.string(),
    thought: z.string(),
    time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
  });
  const res = schema.safeParse(obj);
  return res;
}

//updatethought
function vupdatethought(obj) {
  const schema = z.object({
    topicid: z.string(),
    thought: z.string(),
    edit: z.string(),
    del: z.string(),
  });
  const res = schema.safeParse(obj);
  return res;
}

//chat server validators

//chat
function vchat(obj){
  const schema = z.object({
    sessionid: z.string(),
    userinput: z.string()
  });
  const res = schema.safeParse(obj);
  return res;
}

//sessions
function vsessions(obj){
  const schema = z.string().min(4);
  const res = schema.safeParse(obj);
  return res;
}

//messages
function vmessages(obj){
  const schema = z.string().min(4);
  const res = schema.safeParse(obj);
  return res;
}

//add session
function vstartsession(obj){
  const schema = z.object({
    userid: z.string(),
    sessionTitle: z.string(),
    time: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
  });
  const res = schema.safeParse(obj);
  return res;
}

//edit session
function veditsession(obj){
  const schema = z.object({
    userid: z.string(),
    sessionid: z.string(),
    edit: z.string(),
    del: z.string(),
  });
  const res = schema.safeParse(obj);
  return res;
}

module.exports = {
  vsignup,
  vlogin,
  vtopics,
  vaddtopic,
  vupdatetopic,
  vthoughts,
  vaddthought,
  vupdatethought,
  vchat,
  vsessions,
  vmessages,
  vstartsession,
  veditsession
};
