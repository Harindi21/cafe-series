import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:kirikopi_cafe_admin/src/catalog/catalog_page.dart';

final GoRouter _router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (context, state) => const CatalogPage(),
    ),
  ],
);

class KirikopiAdminApp extends StatelessWidget {
  const KirikopiAdminApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Kirikopi Cafe Admin',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF5C3A21)),
        useMaterial3: true,
      ),
      routerConfig: _router,
    );
  }
}
