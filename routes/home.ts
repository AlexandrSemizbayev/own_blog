import { Router } from "express";

export default function(router: Router) {

router.get('/', (_, res) => {
  res.render('home');
});
}