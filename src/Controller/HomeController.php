<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\UX\Map\Bridge\Google\GoogleOptions;
use Symfony\UX\Map\Bridge\Leaflet\LeafletOptions;
use Symfony\UX\Map\Bridge\Leaflet\Option\TileLayer;
use Symfony\UX\Map\InfoWindow;
use Symfony\UX\Map\Map;
use Symfony\UX\Map\Marker;
use Symfony\UX\Map\Point;

class HomeController extends AbstractController
{
    #[Route(name: 'home')]
    public function __invoke(): Response
    {
        $map = (new Map('default'))
            ->center(new Point(45.7534031, 4.8295061))
            ->zoom(12)

            ->addMarker(new Marker(
                position: new Point(45.7534031, 4.8295061),
                title: 'Lyon',
                infoWindow: new InfoWindow(
                    headerContent: '<b>Lyon</b>',
                    content: '<p>Ousseine</p>'
                ),
            ))

            ->options((new LeafletOptions())
                ->tileLayer(new TileLayer(
                    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    options: ['maxZoom' => 19]
                ))
            )
        ;

        return $this->render('home/index.html.twig', [
            'map' => $map,
        ]);
    }
}
